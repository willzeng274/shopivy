import { CartItem, Category, Item, Prisma, PrismaClient, User } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
// import { unstable_cache } from "next/cache";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

// MUST be called on the server.
// Only called once throughout the app's lifetime
export const fetchUserFromSess = cache(async () => {
    console.log("FETCHING USER FROM SESSION...");
    const cookieStore = cookies();

    // because of middleware, this cannot be null
    const sess = cookieStore.get("ivysess")!;

    const sessionUser = (await prisma.$queryRaw<[User]>(
        Prisma.sql`
            WITH "updated_session" AS (
                UPDATE "Session"
                SET "lastLogin" = NOW()
                WHERE "id" = ${sess.value}
                RETURNING "userId"
            )
            SELECT u.*
            FROM "User" u
            JOIN "updated_session" us ON u."id" = us."userId";
        `
    ))[0];

    if (!sessionUser) {
        await prisma.session.delete({
            where: {
                id: sess.value
            }
        });

        cookieStore.delete("ivysess");

        return permanentRedirect("/auth/login");
    }

    return sessionUser;
});

export const countCartItems = async (id: bigint) => await prisma.cartItem.count({
    where: {
        ordered: false,
        userId: id,
    },
});

export const countOrderItems = async (id: bigint) => await prisma.cartItem.count({
    where: {
        ordered: true,
        userId: id,
    }
});

interface TrendItem extends Item {
    orderCount: BigInt;
    avgRating: number | null;
}

export const getTrendingItems = cache(async () => await prisma.$queryRaw<TrendItem[]>(
    Prisma.sql`
        WITH "item_order_counts" AS (
            SELECT 
                i.*,
                AVG(rv.rating) AS "avgRating",
                COUNT(DISTINCT ci."userId") AS "orderCount"
            FROM 
                "Item" i
            JOIN 
                "CartItem" ci ON i."id" = ci."itemId" AND ordered = TRUE
            LEFT JOIN
                "Review" rv ON i."id" = rv."itemId"
            GROUP BY
                i."id"
        )
        SELECT 
            *
        FROM 
            "item_order_counts"
        ORDER BY 
            "orderCount" DESC
        LIMIT 10
    `
));

interface Purchase extends Item {
    orderId: CartItem["orderId"];
    orderedAt: CartItem["orderedAt"];
}

export const getPurchases = async (id: bigint) => await prisma.$queryRaw<Purchase[]>(
    Prisma.sql`
        WITH "ordered_cart_items" AS (
            SELECT 
                i.*,
                ci."orderedAt",
                ci."orderId"
            FROM 
                "CartItem" ci
            JOIN 
                "Item" i ON i."id" = ci."itemId"
            WHERE 
                ci."userId" = ${id} AND ordered = TRUE
        )
        SELECT 
            *
        FROM 
            "ordered_cart_items"
        ORDER BY 
            "orderedAt" DESC
        LIMIT 3;
    `
);

export const getOrders = async (id: bigint) => await prisma.$queryRaw<Purchase[]>(
    Prisma.sql`
        WITH "ordered_cart_items" AS (
            SELECT 
                i.*,
                ci."orderedAt",
                ci."orderId"
            FROM 
                "CartItem" ci
            JOIN 
                "Item" i ON i."id" = ci."itemId"
            WHERE 
                ci."userId" = ${id}
        )
        SELECT 
            *
        FROM 
            "ordered_cart_items"
    `
);

export interface CartItemFormat {
    id: bigint;
    itemId: bigint;
    quantity: number;
    name: string;
    price: number;
    detailsList: string[];
    imageUrl: string;
    category: Category;
    available: boolean;
}

export const getCartItems = async (id: bigint) => await prisma.$queryRaw<CartItemFormat[]>(
    Prisma.sql`
        SELECT
            ci.id, ci."itemId", ci.quantity, it.name, it.price, it."imageUrl", it.category, it.available, COALESCE(array_agg(itd.detail) FILTER (WHERE itd.detail IS NOT NULL), '{}') AS "detailsList"
        FROM "CartItem" ci
        JOIN "Item" it ON it.id = ci."itemId"
        LEFT JOIN "CartItemDetail" cid ON cid."cartItemId" = ci.id
        LEFT JOIN "ItemDetail" itd ON itd.id = cid."itemDetailId"
        WHERE ci."userId" = ${id} AND ci.ordered = FALSE
        GROUP BY ci.id, ci."itemId", ci.quantity, it.name, it.price, it."imageUrl", it.category, it.available
    `
);