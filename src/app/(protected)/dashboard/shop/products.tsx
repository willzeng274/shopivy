"use client";

import { useShopStore } from "@/utils/stores/shopStore";
import { Item } from "@prisma/client";
import { useMemo } from "react";
import Product from "./_components/product";

export default function Products({ products, id }: { products: (Item & { rating: string | null, reviews: bigint })[], id: bigint }) {
	// console.log("products", products);
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
			<div className={view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" : "space-y-4"}>
				{filteredProducts.map((product) => (
					<Product key={product.id} product={product} id={id} />
				))}
			</div>
		</>
	);
}
