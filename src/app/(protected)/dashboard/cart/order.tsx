import { Button } from "@/components/ui/Button";
import { fetchUserFromSess, getCartItems } from "@/utils/state";
import Link from "next/link";
import Total from "./_components/total";
import CheckoutForm from "./_components/checkout";
import FormBtn from "../shop/_components/FormBtn";

export default async function OrderSummary() {
	const user = await fetchUserFromSess();

	const cartItems = await getCartItems(user.id);

	const itemData = cartItems.map((i) => ({
		price: i.price,
		itemId: i.itemId,
		id: i.id,
		quantity: i.quantity,
	}));
	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h3 className="text-lg font-semibold mb-4">Order Summary</h3>
			<CheckoutForm items={itemData}>
				<Total items={itemData} />
				<FormBtn
					type="submit"
					className="w-full py-2 mb-2 animate-shimmer items-center justify-center rounded-md border border-blue-700 bg-[linear-gradient(110deg,#1e3a8a,47%,#2563eb,53%,#1e3a8a)] bg-[length:200%_100%] px-6 font-medium text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50"
				>
					Checkout
				</FormBtn>
			</CheckoutForm>
			<Link href="/dashboard/shop">
				<Button variant="outline" className="w-full">
					Continue Shopping
				</Button>
			</Link>
		</div>
	);
}
