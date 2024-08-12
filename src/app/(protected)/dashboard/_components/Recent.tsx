import { Skeleton } from "@/components/ui/Skeleton";

const Recent = {
    Loading,
    List
};

export default Recent;

export async function List() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
	return (
		<>
			{[
				{ name: "Introduction to Psychology Textbook", date: "2023-05-15", price: "$59.99" },
				{ name: "Wireless Noise-Cancelling Headphones", date: "2023-05-10", price: "$149.99" },
				{ name: "1-Month Subscription to Online Tutoring", date: "2023-05-05", price: "$29.99" },
			].map((item, index) => (
				<div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
					<div>
						<h4 className="font-semibold text-gray-800">{item.name}</h4>
						<p className="text-sm text-gray-500">Purchased on {item.date}</p>
					</div>
					<p className="font-semibold text-green-600">{item.price}</p>
				</div>
			))}
		</>
	);
}

export function Loading() {
	return (
		<>
			{[...Array(3)].map((_, index) => (
				<div
					key={index}
					className="bg-white rounded-lg shadow p-4 flex justify-between items-center shrink-0 w-full"
				>
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
