"use client";

import { cn } from "@/utils/cn";
import { formatter } from "@/utils/formatter";
import { useShopStore } from "@/utils/stores/shopStore";
import { Item } from "@prisma/client";
import Form from "./Form";
import { addToCart } from "../actions";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/Separator";
// import { Button } from "@/components/ui/Button";
import { CheckIcon, XIcon } from "lucide-react";

export default function Product({ product, id }: { product: Item & { rating: string | null; reviews: bigint }; id: bigint }) {
	const view = useShopStore((state) => state.view);
	const addToCartWithProduct = addToCart.bind(null, id).bind(null, product);
	return (
		<div className={`bg-white w-full rounded-lg p-4 ${view === "list" ? "flex flex-col md:flex-row gap-4" : ""}`}>
			{view === "list" ? (
				<>
					<Link href={`/dashboard/shop/item/${product.id}`} className="flex-shrink-0">
						<Image
							className={`w-full aspect-square h-auto sm:w-40 sm:h-40 rounded-md`}
							width={80}
							height={80}
							src={product.imageUrl ? product.imageUrl : "/goose_plush.jpg"}
							alt="product-image"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
							placeholder="blur"
						/>
					</Link>
					<div className="flex flex-col md:flex-row flex-grow min-w-0">
						<div className="p-4 flex flex-col flex-1 h-40 min-w-0">
							<Link
								href={`/dashboard/shop/item/${product.id}`}
								className="text-lg font-semibold text-gray-800 text-ellipsis max-w-full whitespace-nowrap overflow-x-clip"
							>
								{product.name}
							</Link>
							<p className="text-sm text-gray-600 mb-2">{product.category}</p>
							<div className="flex items-center mb-2 space-x-2">
								<span className="text-yellow-500">
									{product.rating
										? "★".repeat(Math.round(+product.rating)) + "☆".repeat(5 - Math.round(+product.rating))
										: "☆".repeat(5)}
								</span>
								<h6 className="inline-block text-sm">{`${Number(product.reviews)} reviews`}</h6>
								{/* <span className="ml-1 text-sm text-gray-600">
									{product.rating.toFixed(1)}/10 ({product.reviews} reviews)
								</span> */}
							</div>
							<p className="max-h-40 text-sm text-gray-600 break-words overflow-y-auto flex-grow hyphens-auto">{product.description}</p>
						</div>
						<Separator orientation="vertical" className="hidden md:block" />
						<Separator orientation="horizontal" className="block md:hidden" />
						<div className="p-4 pr-0 md:w-[160px] flex flex-col">
							<p className="text-sm font-semibold text-blue-600">{formatter.format(product.price / 100)}</p>
							{product.available ? (
								<span className="text-green-600 text-sm flex items-center mt-1">
									<CheckIcon className="w-4 h-4 mr-1" /> In stock
								</span>
							) : (
								<span className="text-red-600 text-sm flex items-center mt-1">
									<XIcon className="w-4 h-4 mr-1" /> Out of stock
								</span>
							)}
							<Form action={addToCartWithProduct}>
								<button
									disabled={!product.available}
									className="inline-flex items-center mt-2 justify-center w-full whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
									type="submit"
								>
									Add to Cart
								</button>
							</Form>
						</div>
					</div>
				</>
			) : (
				<>
					<Link href={`/dashboard/shop/item/${product.id}`} className="flex-shrink-0">
						<Image
							className={`w-full aspect-square h-auto rounded-md`}
							width={80}
							height={80}
							src={product.imageUrl ? product.imageUrl : "/goose_plush.jpg"}
							alt="product-image"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
							placeholder="blur"
						/>
					</Link>
					<div className={cn(view === "grid" ? "" : "flex-1", "flex flex-col h-48")}>
						<Link
							href={`/dashboard/shop/item/${product.id}`}
							className="text-lg font-semibold mt-1 text-gray-800 text-ellipsis max-w-full whitespace-nowrap overflow-x-clip"
						>
							{product.name}
						</Link>
						<h5 className="text-sm text-gray-600 mb-2">{product.category}</h5>
						<p className="font-semibold text-blue-600">{formatter.format(product.price / 100)}</p>
						<div className="space-x-2 flex items-center">
							<span className="text-yellow-500">
								{product.rating
									? "★".repeat(Math.round(+product.rating)) + "☆".repeat(5 - Math.round(+product.rating))
									: "☆".repeat(5)}
							</span>
							<h6 className="inline-block text-sm">{`${Number(product.reviews)} reviews`}</h6>
						</div>
						{product.available ? (
							<span className="mb-2 text-green-600 text-sm flex items-center mt-1">
								<CheckIcon className="w-4 h-4 mr-1" /> In stock
							</span>
						) : (
							<span className="mb-2 text-red-600 text-sm flex items-center mt-1">
								<XIcon className="w-4 h-4 mr-1" /> Out of stock
							</span>
						)}
						<span className="flex-1" />
						<Form action={addToCartWithProduct}>
							<button
								disabled={!product.available}
								className="inline-flex items-center justify-center max-w-xs min-w-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
								type="submit"
							>
								Add to Cart
							</button>
						</Form>
					</div>
				</>
			)}
		</div>
	);
}
