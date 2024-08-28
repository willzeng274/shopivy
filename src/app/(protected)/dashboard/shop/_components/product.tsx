"use client";

import { cn } from "@/utils/cn";
import { formatter } from "@/utils/formatter";
import { useShopStore } from "@/utils/stores/shopStore";
import { Item } from "@prisma/client";
import Form from "./Form";
import { addToCart } from "../actions";
import Link from "next/link";
import Image from "next/image";

export default function Product({ product, id }: { product: Item & { rating: string | null; reviews: bigint }; id: bigint }) {
	const view = useShopStore((state) => state.view);
	const addToCartWithProduct = addToCart.bind(null, id).bind(null, product);
	return (
		<div className={`bg-white rounded-lg p-4 ${view === "grid" ? "" : "flex gap-4"}`}>
			<Link href={`/dashboard/shop/item/${product.id}`} className="w-full h-40">
				<Image
					className={`${view === "grid" ? "w-40 h-40" : "w-40 h-40"} rounded-md`}
					width={80}
					height={80}
					src="/goose_plush.jpg"
					alt="product-image"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
					placeholder="blur"
				/>
				{/* <div className={`${view === "grid" ? "w-full h-40" : "w-40 h-40"} bg-gray-200 rounded-md`} /> */}
			</Link>
			<div className={cn(view === "grid" ? "" : "flex-1", "flex flex-col h-40")}>
				<Link
					href={`/dashboard/shop/item/${product.id}`}
					className="text-lg font-semibold mt-1 text-gray-800 text-ellipsis max-w-full whitespace-nowrap overflow-x-clip"
				>
					{product.name}
				</Link>
				<h5 className="text-sm text-gray-600 mb-2">{product.category}</h5>
				<p className="font-semibold text-blue-600">{formatter.format(product.price / 100)}</p>
				<div className="space-x-2 mb-2 flex items-center">
					<span className="text-yellow-500">
						{product.rating
							? "★".repeat(Math.round(+product.rating)) + "☆".repeat(5 - Math.round(+product.rating))
							: "☆".repeat(5)}
					</span>
					<h6 className="inline-block text-sm">{`${Number(product.reviews)} reviews`}</h6>
				</div>
				<span className="flex-1" />
				<Form action={addToCartWithProduct}>
					<button
						className="inline-flex items-center justify-center max-w-xs min-w-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
						type="submit"
					>
						Add to Cart
					</button>
				</Form>
			</div>
		</div>
	);
}
