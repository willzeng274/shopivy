import { Skeleton } from "@/components/ui/Skeleton";
import { formatter } from "@/utils/formatter";
import { fetchUserFromSess, getPurchases } from "@/utils/state";
import { PackageIcon } from "lucide-react";
import Link from "next/link";

const Recent = {
	Loading,
	List,
};

export default Recent;

export async function List() {
	// await new Promise((resolve) => setTimeout(resolve, 3000));

	const user = await fetchUserFromSess();

	const purchases = await getPurchases(user.id);

	return (
		<>
			{purchases.length ? (
				purchases.map((item, index) => (
					<div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
						<div>
							<h4 className="font-semibold text-gray-800">{item.name}</h4>
							<p className="text-sm text-gray-500">Purchased on {item.orderedAt?.toISOString().split("T")[0]}</p>
						</div>
						<p className="font-semibold text-green-600">{formatter.format(item.price / 100)}</p>
					</div>
				))
			) : (
				<div className="bg-white rounded-lg shadow p-6 text-center">
					<PackageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					<h4 className="text-xl font-semibold text-gray-800 mb-2">No purchases yet</h4>
					<p className="text-gray-600 mb-4">Start shopping to see your recent purchases here!</p>
					<Link href="/dashboard/shop" className="h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Explore Products</Link>
				</div>
			)}
		</>
	);
}

export function Loading() {
	return (
		<>
			{[...Array(3)].map((_, index) => (
				<div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center shrink-0 w-full">
					<div className="space-y-2">
						<Skeleton className="h-5 w-[150px]" />
						<Skeleton className="h-4 w-[100px]" />
					</div>
					<Skeleton className="h-4 w-[60px]" />
				</div>
			))}
		</>
	);
}
