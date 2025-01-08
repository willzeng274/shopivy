import { fetchUserFromSess } from "@/utils/state";
import Link from "next/link";
import Recent from "./_components/Recent";
import { Suspense } from "react";
import Recommended from "./_components/Recommended";
import { ScrollArea } from "@/components/ui/ScrollArea";
// import { permanentRedirect } from "next/navigation";

const getSeasonalSale = () => {
	const month = new Date().getMonth();
	if (month >= 0 && month <= 3) {
		return "Winter Sale!";
	} else if (month >= 4 && month <= 7) {
		return "Summer Sale!";
	} else {
		return "Fall Sale!";
	}
};

export default async function Page() {
	const user = await fetchUserFromSess();

	return (
		<ScrollArea className="w-full flex-1">
			<main className="w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back, {user.name}!</h2>

				<section className="mb-8 space-y-4">
					<h3 className="text-xl font-semibold text-gray-700">Featured Deals</h3>
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
						<h4 className="text-2xl font-bold mb-2">{getSeasonalSale()}</h4>
						<p className="mb-4">Get 20% off on all textbooks and study materials.</p>
						<Link
							href="/dashboard/shop"
							className="bg-white text-purple-600 hover:bg-gray-100 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							Shop Now
						</Link>
					</div>
					<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
						<h4 className="text-2xl font-bold mb-2">Student Success Sale!</h4>
						<p className="mb-4">Gear up for the new term with amazing discounts on all student essentials.</p>
						<Link
							href="/dashboard/shop"
							className="bg-white text-purple-600 hover:bg-gray-100 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							Shop Now
						</Link>
					</div>
				</section>

				<section className="mb-8">
					<h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Purchases</h3>
					<div className="space-y-4">
						<Suspense fallback={<Recent.Loading />}>
							<Recent.List />
						</Suspense>
					</div>
				</section>

				<section>
					<h3 className="text-xl font-semibold text-gray-700 mb-4">Recommended for You</h3>
					<Suspense
						fallback={
							<div className="max-w-full overflow-x-hidden gap-x-4 inline-grid grid-cols-[repeat(2,minmax(min-content,1fr))] grid-rows-[repeat(1,1fr)] overflow-y-hidden auto-rows-[0] sm:grid-cols-[repeat(2,minmax(min-content,1fr))] md:grid-cols-[repeat(3,minmax(min-content,1fr))] lg:grid-cols-[repeat(4,minmax(min-content,1fr))] xl:grid-cols-[repeat(5,minmax(min-content,1fr))]">
								<Recommended.Loading />
							</div>
						}
					>
						<div className="flex space-x-4 whitespace-nowrap overflow-x-auto p-2 pb-4 max-w-full">
							<Recommended.List />
						</div>
					</Suspense>
				</section>
			</main>
		</ScrollArea>
	);
}
