"use server";
import { Prisma } from "@prisma/client";
import { createId } from '@paralleldrive/cuid2';
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/state";

export async function decrementAction(cartItemId: bigint, curr: number): Promise<number> {
    if (curr <= 1) return 1;
    const it = await prisma.cartItem.update({
        data: {
            quantity: {
                decrement: 1,
            },
        },
        where: {
            id: cartItemId
        },
    });
    return it.quantity;
};

export async function incrementAction(cartItemId: bigint, curr: number): Promise<number> {
    if (curr >= 9999) return 9999;
    const it = await prisma.cartItem.update({
        data: {
            quantity: {
                increment: 1,
            },
        },
        where: {
            id: cartItemId
        },
    });
    return it.quantity;
};

export async function inputAction(cartItemId: bigint, curr: number): Promise<number> {
    const it = await prisma.cartItem.update({
        data: {
            quantity: Math.min(9999, Math.max(0, curr))
        },
        where: {
            id: cartItemId
        },
    });
    return it.quantity;
};

export async function deleteAction(cartItemId: bigint) {
    await prisma.cartItem.delete({
        where: {
            id: cartItemId
        },
    });
};

export async function createOrder(id: bigint, items: { id: bigint, price: number, quantity: number, itemId: bigint }[]) {
    if (!items.length) return;
    const orderValues = items.map(i => i.id.toString());
    console.log("order values", orderValues, items);
    const created = await prisma.$queryRaw(
        Prisma.sql`
            WITH new_order AS (
                INSERT INTO "Order" ("id", "status", "userId", "updatedAt")
                VALUES (${createId()}, 'pending', ${id}, NOW())
                RETURNING "id" AS order_id
            ),
            update_cart_items AS (
                UPDATE "CartItem"
                SET
                    "orderId" = new_order.order_id,
                    "ordered" = TRUE,
                    "orderedAt" = NOW()
                FROM new_order
                WHERE "id" IN (${Prisma.raw(orderValues.join(', '))})
                RETURNING "id" AS updated_cart_item_id
            )
            SELECT * FROM update_cart_items;
        `
    );
    console.log("CREATED", created);
    revalidatePath("/dashboard/order")
}