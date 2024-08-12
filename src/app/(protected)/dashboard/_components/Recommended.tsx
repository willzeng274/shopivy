import { Skeleton } from "@/components/ui/Skeleton";

const Recommended = {
	Loading,
	List,
};

export default Recommended;

export async function List() {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	return (
		<>
			{[
				{ name: "Scientific Calculator", price: "$24.99", color: "bg-pink-100" },
				{ name: "Ergonomic Desk Chair", price: "$129.99", color: "bg-blue-100" },
				{ name: "Annual Planner", price: "$19.99", color: "bg-green-100" },
				{ name: "Laptop Stand", price: "$34.99", color: "bg-yellow-100" },
			].map((item, index) => (
				<div key={index} className={`flex-shrink-0 w-64 ${item.color} rounded-lg shadow-md p-4`}>
					<div className="w-full h-32 bg-gray-300 rounded-md mb-4"></div>
					<h4 className="font-semibold text-gray-800">{item.name}</h4>
					<p className="text-sm text-gray-600 mb-2">{item.price}</p>
					<button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
						Add to Cart
					</button>
				</div>
			))}
		</>
	);
}

export function Loading() {
	return (
		<>
			{[...Array(5)].map((_, index) => (
				<div key={index} className="bg-white flex-shrink-0 w-64 rounded-lg shadow-md p-4 space-y-4">
					<Skeleton className="w-full h-32 rounded-md" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
					<Skeleton className="w-full h-10 rounded-md" />
				</div>
			))}
		</>
	);
}
