import { Button } from "@/components/ui/Button";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { formatter } from "@/utils/formatter";
import { fetchUserFromSess, getCartItems } from "@/utils/state";
import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Quantity from "./_components/quantity";
import Link from "next/link";
import SelectAll from "./_components/selectAll";
import ItemCheckbox from "./_components/itemCheckbox";
import DeleteButton from "./_components/deleteBtn";

export default async function Items() {
	const user = await fetchUserFromSess();

	// console.log(user.id);

	const cartItems = await getCartItems(user.id);

	// console.log("items", cartItems);

	return (
		<>
			{cartItems.length ? (
				<>
					<SelectAll />
					{cartItems.map((item) => (
						<div key={item.id.toString()} id={`cart-item-${item.id}`} className="bg-white rounded-lg shadow">
							<div className="flex items-center p-4 border-b border-gray-200">
								<ItemCheckbox id={item.id} />
								<label htmlFor={`check-${item.id}`} className="ml-2 font-medium text-gray-700 flex-grow">
									{item.name}
								</label>
								<p className="font-semibold text-gray-900">{formatter.format(item.price / 100)}</p>
								{/* <span className="text-sm font-semibold text-gray-900">CA${item.price.toFixed(2)}</span> */}
							</div>
							<div className="flex p-4 items-start">
								<Image
									className="w-36 m-2 h-auto aspect-square self-center rounded-md flex-shrink-0"
									width={80}
									height={80}
									src="/goose_plush.jpg"
									alt="product-image"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
									placeholder="blur"
								/>
								<div className="ml-4 flex-grow">
									<ScrollArea className="h-8 max-w-72">
										<div className="flex flex-row divide-x divide-gray-400 [&>:first-child]:pr-1 [&>:not(:first-child)]:px-1 max-w-full">
											{item.detailsList.length ? (
												item.detailsList.map((detail, idx) => (
													<h2 className="text-slate-500 text-nowrap" key={idx}>
														{detail}
													</h2>
												))
											) : (
												<h2 className="text-slate-500 text-nowrap">Default</h2>
											)}
										</div>
										<ScrollBar className="h-2" orientation="horizontal" />
									</ScrollArea>
									<p className="mt-1">
										{item.available ? (
											<span className="text-green-600 flex items-center">
												<CheckIcon className="w-4 h-4 mr-1" /> In stock
											</span>
										) : (
											<span className="text-red-600 flex items-center">
												<XIcon className="w-4 h-4 mr-1" /> Out of stock
											</span>
										)}
									</p>
								</div>
								<div className="flex flex-col items-center space-y-2">
									<div className="flex items-center space-x-2">
										<div className="flex items-center bg-secondary rounded-md">
											<Quantity item={item} />
										</div>
										<DeleteButton item={item} />
									</div>
								</div>
								{/* <div className="flex-grow p-4 flex flex-col justify-between">
								<div>
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-semibold text-gray-800">{item.name}</h3>
											<ScrollArea className="h-5 max-w-72">
												<div className="flex flex-row divide-x divide-gray-400 [&>:first-child]:pr-1 [&>:not(:first-child)]:px-1 max-w-full">
													{item.detailsList.length ? (
														item.detailsList.map((detail, idx) => (
															<h2 className="text-slate-500 text-xs text-nowrap" key={idx}>
																{detail}
															</h2>
														))
													) : (
														<h2 className="text-slate-500 text-xs text-nowrap">Default</h2>
													)}
												</div>
												<ScrollBar className="h-2" orientation="horizontal" />
											</ScrollArea>
											<p className="font-semibold text-gray-900">{formatter.format(item.price / 100)}</p>
										</div>
										<div className="flex items-center space-x-2">
											<div className="flex items-center bg-secondary rounded-md">
												<Quantity item={item} />
											</div>
											<Button variant="ghost" size="sm" aria-label="Remove item" className="h-8 w-8 p-0">
												<TrashIcon className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>
								<p className="text-sm">
									{item.available ? (
										<span className="text-green-600 flex items-center">
											<CheckIcon className="w-4 h-4 mr-1" /> In stock
										</span>
									) : (
										<span className="text-red-600 flex items-center">
											<XIcon className="w-4 h-4 mr-1" /> Out of stock
										</span>
									)}
								</p>
							</div> */}
							</div>
						</div>
					))}
				</>
			) : (
				<main className="p-6">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
						<EmptyCartSVG />
						<p className="text-xl text-gray-600 mb-8">Looks like your shopping cart is as bare as a leafless ivy vine!</p>
						<p className="text-lg text-gray-500 mb-8">
							Time to nurture your academic growth. Fill your cart with the tools for success!
						</p>
						<Link href="/dashboard/shop">
							<Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
								Start Shopping
							</Button>
						</Link>
					</div>
				</main>
			)}
		</>
	);
}

function EmptyCartSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-64 h-64 mx-auto mb-8">
			<g fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
				{/* Shopping cart */}
				<path d="M40,80 L160,80 L140,140 L60,140 Z" className="animate-draw" />
				<path d="M60,140 L50,160 L150,160 L140,140" className="animate-draw" />
				<circle cx="70" cy="180" r="10" className="animate-draw" />
				<circle cx="130" cy="180" r="10" className="animate-draw" />

				{/* Ivy leaves */}
				<path d="M30,30 Q40,20 50,30 T70,30" className="animate-draw" />
				<path d="M35,40 Q45,30 55,40 T75,40" className="animate-draw" />
				<path d="M130,30 Q140,20 150,30 T170,30" className="animate-draw" />
				<path d="M125,40 Q135,30 145,40 T165,40" className="animate-draw" />

				{/* Dotted line to cart */}
				<path d="M50,50 L70,70" className="animate-draw" strokeDasharray="5,5" />
				<path d="M150,50 L130,70" className="animate-draw" strokeDasharray="5,5" />
			</g>
		</svg>
	);
}
