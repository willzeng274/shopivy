import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import Link from "next/link";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import Items from "./items";

export default function Page() {
	const cartItems = [
		{
			id: 1,
			quantity: 1,
			name: "Introduction to Psychology",
			price: 59.99,
			detailsList: ["Paperback", "650 pages", "Published in 2021"],
			imageUrl: "",
			category: "Book",
			available: true,
		},
		{
			id: 2,
			quantity: 1,
			name: "Wireless Noise-Cancelling Headphones",
			price: 149.99,
			detailsList: ["Over-ear", "Bluetooth 5.0", "20-hour battery life"],
			imageUrl: "",
			category: "Electronic",
			available: true,
		},
		{
			id: 3,
			quantity: 1,
			name: "Ergonomic Desk Chair",
			price: 129.99,
			detailsList: ["Adjustable height", "Lumbar support", "Breathable mesh"],
			imageUrl: "",
			category: "Dorm",
			available: true,
		},
		{
			id: 4,
			quantity: 1,
			name: "4K Ultra HD Smart TV",
			price: 499.99,
			detailsList: ["55-inch display", "HDR10+", "Smart apps included"],
			imageUrl: "",
			category: "Electronic",
			available: false,
		},
		{
			id: 5,
			quantity: 2,
			name: "Bluetooth Portable Speaker",
			price: 79.99,
			detailsList: ["Water-resistant", "12-hour playtime", "Compact design"],
			imageUrl: "",
			category: "Electronic",
			available: true,
		},
		{
			id: 6,
			quantity: 3,
			name: "Stainless Steel Water Bottle",
			price: 24.99,
			detailsList: ["750ml", "Keeps drinks cold for 24 hours", "Leak-proof"],
			imageUrl: "",
			category: "Stationary",
			available: true,
		},
		{
			id: 7,
			quantity: 1,
			name: "Gaming Keyboard with RGB",
			price: 89.99,
			detailsList: ["Mechanical keys", "Customizable RGB lighting", "USB-C"],
			imageUrl: "",
			category: "Electronic",
			available: true,
		},
		{
			id: 8,
			quantity: 1,
			name: "Yoga Mat",
			price: 19.99,
			detailsList: ["Non-slip surface", "5mm thickness", "Eco-friendly material"],
			imageUrl: "",
			category: "Stationary",
			available: true,
		},
		{
			id: 9,
			quantity: 1,
			name: "Advanced JavaScript Programming",
			price: 39.99,
			detailsList: ["Hardcover", "800 pages", "Published in 2022"],
			imageUrl: "",
			category: "Book",
			available: true,
		},
		{
			id: 10,
			quantity: 2,
			name: "Wireless Charging Pad",
			price: 29.99,
			detailsList: ["Fast charging", "Qi-compatible", "Sleek design"],
			imageUrl: "",
			category: "Electronic",
			available: false,
		},
	];

	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const tax = subtotal * 0.1; // Assuming 10% tax
	const total = subtotal + tax;
	return (
		<div className="flex-1">
			<main className="flex flex-col w-full p-6 pb-0 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Shopping Cart</h2>
				<div className="flex flex-col lg:flex-row gap-6 flex-1 relative">
					<div className="flex-grow">
						<ScrollArea className="h-full [&>div>div]:space-y-4 pb-4">
							<Suspense
								fallback={[...Array(3)].map(() => (
									<div className="bg-white rounded-lg shadow flex">
										<Skeleton className="w-36 h-36 m-2 rounded-md" />
										<div className="flex-grow p-4 flex flex-col justify-between">
											<div>
												<div className="flex justify-between items-start">
													<div className="space-y-2">
														<Skeleton className="h-5 w-40" />
														<Skeleton className="h-3 w-72" />
														<Skeleton className="h-4 w-20" />
													</div>
													<div className="flex items-center space-x-2">
														<Skeleton className="h-8 w-24 rounded-md" />
														<Skeleton className="h-8 w-8 rounded-full" />
													</div>
												</div>
											</div>
											<Skeleton className="h-4 w-24 mt-4" />
										</div>
									</div>
								))}
							>
                                <Items />
                            </Suspense>
						</ScrollArea>
					</div>
					<div className="lg:w-80">
						<div className="bg-white p-6 rounded-lg shadow">
							<h3 className="text-lg font-semibold mb-4">Order Summary</h3>
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
							<button className="w-full py-2 mb-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
								Checkout
							</button>
							{/* <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2">Proceed to Checkout</Button> */}
							<Link href="/dashboard/shop">
								<Button variant="outline" className="w-full">
									Continue Shopping
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</main>
			{/* <p>Cart page is still under construction</p>
			<Link href="/dashboard" className="text-blue-500 hover:underline">
				Go to dashboard
			</Link> */}
		</div>
	);
}
