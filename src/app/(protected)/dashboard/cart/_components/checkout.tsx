"use client";

import React, { useMemo } from "react";
import { useCheckStore } from "../chkStore";
import { createOrder } from "../actions";
import { useAuthStore } from "@/utils/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/utils/stores/userCtx";

export default function CheckoutForm({
    items,
    children
}: {
    items: { id: bigint, quantity: number, price: number, itemId: bigint }[],
    children: React.ReactNode
}) {
    const cartChecked = useCheckStore((state) => state.cartChecked);
    const allChecked = useCheckStore((state) => state.allChecked);
    const user = useUser();
    const router = useRouter();

    const selectedItems = useMemo(() => allChecked ? items : items.filter((i) => cartChecked[i.id.toString()]), [cartChecked, allChecked]);
	return (
		<form
			action={async function () {
                if (!selectedItems.length) {
                    toast.error("Please select at least one item");
                    return;
                }
                // console.log("submit");
				await createOrder(user.id, selectedItems);
                router.push("/dashboard/order");
			}}
		>
			{children}
		</form>
	);
}
