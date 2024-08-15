import { Slider } from "@/components/ui/Slider";
import { Category } from "@prisma/client";
import { GridIcon, LayoutListIcon } from "lucide-react";
// import Link from "next/link";
import React from "react";

export default function Page() {
	const viewMode = "grid";
	return (
		<main className="w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold text-gray-800">Shop Student Essentials</h2>
				<div className="flex space-x-2">
					<button
						className="bg-white shadow-sm h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
						// onClick={() => setViewMode("grid")}
					>
						<GridIcon className="h-4 w-4" />
					</button>
					<button
						className="bg-white shadow-sm h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
						// onClick={() => setViewMode("list")}
					>
						<LayoutListIcon className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				<aside className="w-full md:w-64 space-y-6">
					<div>
						<h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
						<div className="space-y-2 bg-white rounded-md shadow-md p-2">
							{Object.values(Category).map((category, index) => (
								<button
									key={index}
									className="w-full justify-start hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-purple-600 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									{category}
								</button>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-700 mb-2">Price Range</h3>
						<Slider min={0} max={200} defaultValue={[20, 100]} step={10} className="w-full [&_span:first-child]:bg-white" />
					</div>
				</aside>

				<div className="flex-1">
					<div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
						{/* {filteredProducts.map((product) => (
							<div
								key={product.id}
								className={`bg-white rounded-lg shadow-md p-4 ${viewMode === "grid" ? "" : "flex gap-4"}`}
							>
								<div className={`${viewMode === "grid" ? "w-full h-40" : "w-40 h-40"} bg-gray-200 rounded-md mb-4`}></div>
								<div className={viewMode === "grid" ? "" : "flex-1"}>
									<h4 className="font-semibold text-gray-800">{product.name}</h4>
									<p className="text-sm text-gray-600 mb-2">${product.price.toFixed(2)}</p>
									<span className="text-yellow-500 block mb-2">{"★".repeat(Math.round(product.rating))}</span>
									<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Add to Cart</Button>
								</div>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</main>
		// <div>
		//     <p>Shopping page is still under construction</p>
		//     <Link href="/dashboard" className="text-blue-500 hover:underline">Go to dashboard</Link>
		// </div>
	);
}
