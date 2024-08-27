import { Item, OrderItem, Prisma, PrismaClient, User } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

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

export const countCartItems = cache(async (id: bigint) => await prisma.cartItem.count({
    where: {
        ordered: false,
        userId: id,
    },
}));

export const countOrderItems = cache(async (id: bigint) => await prisma.orderItem.count({
    where: {
        cartUserId: id
    }
}));

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
                COUNT(DISTINCT oi."cartUserId") AS "orderCount"
            FROM 
                "Item" i
            JOIN 
                "OrderItem" oi ON i."id" = oi."cartItemId"
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
    `
));

interface Purchase extends Item {
	orderId: OrderItem["orderId"];
	createdAt: OrderItem["createdAt"];
}

export const getPurchases = cache(async (id: bigint) => await prisma.$queryRaw<Purchase[]>(
    Prisma.sql`
        WITH "ordered_cart_items" AS (
            SELECT 
                i.*,
                oi."createdAt",
                oi."orderId"
            FROM 
                "OrderItem" oi
            JOIN 
                "Item" i ON i."id" = oi."cartItemId"
            WHERE 
                oi."cartUserId" = ${id}
        )
        SELECT 
            *
        FROM 
            "ordered_cart_items"
        ORDER BY 
            "createdAt" DESC
        LIMIT 3;
    `
));