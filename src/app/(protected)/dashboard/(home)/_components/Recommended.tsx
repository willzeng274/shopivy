import { Skeleton } from "@/components/ui/Skeleton";
import { formatter } from "@/utils/formatter";
import { getTrendingItems } from "@/utils/state";

const Recommended = {
	Loading,
	List,
};

export default Recommended;

export async function List() {
	// await new Promise((resolve) => setTimeout(resolve, 8000));

	const trending = await getTrendingItems();

	// console.log("trending", trending);

	return (
		<>
			{trending.map((item) => (
				<div
					key={item.id}
					className="bg-white flex-shrink-0 w-64 rounded-lg shadow-md p-4 transition-transform origin-center hover:scale-105"
				>
					<div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
						Bought by {item.orderCount.toString()} customers
					</div>
					<h4 className="font-semibold text-gray-800 text-ellipsis whitespace-nowrap overflow-x-hidden">{item.name}</h4>
					<p className="text-sm text-gray-600 mb-2">{formatter.format(item.price / 100)}</p>
					<div className="flex justify-between items-center">
						{item.avgRating !== null ? (
							<span className="text-yellow-500">{"★".repeat(Math.round(item.avgRating))}</span>
						) : (
							<span>No reviews.</span>
						)}
						<button className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
							Add to Cart
						</button>
					</div>
				</div>
			))}
		</>
	);
}

export function Loading() {
	return (
		<>
			{[...Array(5)].map((_, index) => (
				<div key={index} className="bg-white flex-shrink-0 w-64 rounded-lg shadow-md p-4">
					<Skeleton className="w-full h-40 rounded-md mb-4" />
					<Skeleton className="h-5 w-3/4 mb-2" />
					<Skeleton className="h-4 w-1/3 mb-2" />
					<div className="flex justify-between items-center">
						<Skeleton className="w-1/5 h-4" />
						<Skeleton className="w-1/2 h-10 rounded-md" />
					</div>
				</div>
			))}
		</>
	);
}
