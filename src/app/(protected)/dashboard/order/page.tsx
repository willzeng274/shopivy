import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { fetchUserFromSess, getOrders } from "@/utils/state";
import Link from "next/link";
import React from "react";

export default async function Page() {
	const user = await fetchUserFromSess();
	
	const orders = await getOrders(user.id);

	// console.log(orders);

	return (
		<ScrollArea className="w-full flex-1">
			<main className="w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				{orders.length ? (
					<>
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h2>
						<div className="space-y-6">
							{orders.map((order) => (
								<Accordion type="single" collapsible key={order.id}>
									<AccordionItem value={order.id}>
										<AccordionTrigger className="bg-white rounded-t-lg p-4 hover:bg-gray-50">
											<div className="flex justify-between items-center w-full">
												<div className="text-left">
													<h3 className="font-semibold">Order #{order.id}</h3>
													<p className="text-sm text-gray-500">Placed on {order.createdAt.toString()}</p>
												</div>
												<div className="text-right">
													<p className="font-semibold">${order.orders.reduce((sum: any, o: any) => sum + o.price * o.quantity / 100, 0)}</p>
													<p
														className={`text-sm ${
															order.status === "Delivered"
																? "text-green-600"
																: order.status === "In Transit"
																? "text-blue-600"
																: "text-orange-600"
														}`}
													>
														{order.status}
													</p>
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent className="bg-white rounded-b-lg p-4 border-t">
											<ul className="space-y-4">
												{order.orders.map((item: any) => (
													<li key={item.id} className="flex justify-between items-center">
														<div>
															<h4 className="font-medium">{item.name}</h4>
															<p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
														</div>
														<p className="font-medium">${(item.price / 100).toFixed(2)}</p>
													</li>
												))}
											</ul>
											<div className="mt-4 pt-4 border-t flex justify-between items-center">
												<Button variant="outline">Track Package</Button>
												<Button>Buy Again</Button>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</div>
					</>
				) : (
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Your Order History is Empty</h2>
						<EmptyOrdersSVG />
						<p className="text-xl text-gray-600 mb-8">Looks like you haven't planted any seeds of knowledge yet!</p>
						<p className="text-lg text-gray-500 mb-8">
							Start your academic journey by ordering the tools you need for success.
						</p>
						<Link
							href="/dashboard/shop"
							className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
						>
							Explore Student Essentials
						</Link>
					</div>
				)}
			</main>
		</ScrollArea>
	);
}

function EmptyOrdersSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64 mx-auto mb-8">
			<g fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
				{/* Graduation cap */}
				<path d="M20,100 L100,60 L180,100 L100,140 Z" className="animate-draw" />
				<path d="M60,115 L60,160" className="animate-draw" />
				<path d="M60,160 Q100,140 140,160" className="animate-draw" />

				{/* Book stack */}
				<rect x="70" y="110" width="60" height="10" className="animate-draw" />
				<rect x="65" y="120" width="70" height="10" className="animate-draw" />
				<rect x="60" y="130" width="80" height="10" className="animate-draw" />

				{/* Order clipboard */}
				<rect x="140" y="70" width="40" height="60" rx="5" className="animate-draw" />
				<line x1="150" y1="85" x2="170" y2="85" className="animate-draw" />
				<line x1="150" y1="95" x2="170" y2="95" className="animate-draw" />
				<line x1="150" y1="105" x2="170" y2="105" className="animate-draw" />

				{/* Pencil */}
				<line x1="30" y1="170" x2="60" y2="140" className="animate-draw" />
				<line x1="60" y1="140" x2="65" y2="145" className="animate-draw" />
				<line x1="30" y1="170" x2="25" y2="175" className="animate-draw" />
			</g>
		</svg>
	);
}
