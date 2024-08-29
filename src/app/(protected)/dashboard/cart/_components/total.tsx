"use client";

import { useMemo } from "react";
import { useCheckStore } from "../chkStore";
import { useQuantStore } from "../quantStore";

export default function Total({ items }: { items: { price: number; quantity: number; id: bigint; itemId: bigint }[] }) {
	const cartChecked = useCheckStore((state) => state.cartChecked);
	const allChecked = useCheckStore((state) => state.allChecked);
	const quant = useQuantStore((state) => state.item);

	const subtotal = useMemo(() => {
		return items.reduce((sum, item) => {
			// console.log("reducing", item.id, quant, quant[item.id.toString()]);
			if (allChecked) {
				const itemQuantity = quant[item.id.toString()] ? quant[item.id.toString()] : item.quantity;
				return sum + (item.price * itemQuantity) / 100;
			} else {
				if (cartChecked[item.id.toString()]) {
					const itemQuantity = quant[item.id.toString()] ? quant[item.id.toString()] : item.quantity;
					return sum + (item.price * itemQuantity) / 100;
				} else {
					return sum;
				}
			}
		}, 0);
	}, [items, quant, cartChecked, allChecked]);
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
