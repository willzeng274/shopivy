"use client";

import { useMemo } from "react";
import { useCheckStore } from "../chkStore";

export default function Total({ items }: { items: { price: number, quantity: number, id: bigint, itemId: bigint }[] }) {
    const cartChecked = useCheckStore((state) => state.cartChecked);
    const allChecked = useCheckStore((state) => state.allChecked);

    const subtotal = useMemo(() => items.reduce((sum, item) => allChecked ? (sum + (item.price * item.quantity) / 100) : (cartChecked[item.id.toString()] ? (sum + (item.price * item.quantity) / 100) : sum), 0), [items, cartChecked, allChecked]);
    const tax = useMemo(() => subtotal * 0.13, [subtotal]);
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

	return (
		<div className="space-y-2 mb-4">
			<div className="flex justify-between">
				<span>Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between">
				<span>Tax</span>
				<span>${tax.toFixed(2)}</span>
			</div>
			<div className="flex justify-between font-semibold">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</div>
		</div>
	);
}
