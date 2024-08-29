"use server";

import { CartItem, Item, Prisma } from "@prisma/client";
import { FormResponse } from "./_components/Form";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/state";

export async function addToCart(id: bigint, product: Item & { rating: string | null }, _prevState: FormResponse, _formData: FormData) {
    const items: CartItem = await prisma.$transaction(async (prisma) => {
        const updatedItems = await prisma.$queryRaw<CartItem[]>(
            Prisma.sql`
                UPDATE public."CartItem"
                SET quantity = quantity + 1
                WHERE "itemId" = ${product.id} AND "userId" = ${id} AND "ordered" = false
                RETURNING *
            `
        );

        if (updatedItems.length > 0) {
            return updatedItems[0];
        }

        const newItem = await prisma.cartItem.create({
            data: {
                itemId: product.id,
                userId: id,
                quantity: 1,
                ordered: false
            }
        });

        return newItem;
    });

    revalidatePath("/dashboard/cart");

    return {
        toast: `Added ${product.name} to cart. Current quantity: ${items.quantity}`
    };
}