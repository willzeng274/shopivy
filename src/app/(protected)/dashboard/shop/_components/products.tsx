"use client";

import { cn } from "@/utils/cn";
import { formatter } from "@/utils/formatter";
import { useShopStore } from "@/utils/stores/shopStore";
import { Item } from "@prisma/client";
import { useMemo } from "react";

export default function Products({ products }: { products: (Item & { rating: string | null })[] }) {
	const view = useShopStore((state) => state.view);
    const selectedCategory = useShopStore((state) => state.selectedCategory);
    const priceRange = useShopStore((state) => state.priceRange);

	const filteredProducts = useMemo(() => products.filter(
		(product) =>
			(selectedCategory === "All" || product.category === selectedCategory) &&
			product.price >= priceRange[0]*100 &&
			product.price <= (priceRange[1]*100 === 10001 ? Infinity : priceRange[1]*100)
	), [selectedCategory, priceRange]);

	return (
		<>
			<div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
				{filteredProducts.map((product) => (
					<div key={product.id} className={`bg-white rounded-lg shadow-md p-4 ${view === "grid" ? "" : "flex gap-4"}`}>
						<div className={`${view === "grid" ? "w-full h-40" : "w-40 h-40"} bg-gray-200 rounded-md`}></div>
						<div className={cn(view === "grid" ? "" : "flex-1", "flex flex-col h-40")}>
							<h4 className="font-semibold text-gray-800">{product.name}</h4>
                            <h5 className="text-sm text-gray-700 mb-2">Category: {product.category}</h5>
							<p className="text-sm text-gray-600 mb-2">{formatter.format(product.price / 100)}</p>
							<span className="text-yellow-500 block mb-2">{product.rating ? "★".repeat(Math.round(+product.rating)) + " " + (+product.rating).toFixed(2) : "No reviews"}</span>
                            <span className="flex-1" />
							<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-red-600 hover:bg-red-700 text-white ">
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
