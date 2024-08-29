import FilterSection from "./filter";
import LayoutBtn from "./LayoutBtn";
import { ScrollArea } from "@/components/ui/ScrollArea";
import Products from "./products";
import { Item, Prisma } from "@prisma/client";
import { fetchUserFromSess, prisma } from "@/utils/state";
import SearchBar from "./_components/searchBar";

export default async function Page({
	searchParams
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const user = await fetchUserFromSess();
	
	const products = (await prisma.$queryRaw<(Item & { rating: number | null, reviews: bigint })[]>(
		Prisma.sql`
			SELECT 
				i.*,
				AVG(rv.rating) AS "rating",
				COUNT(DISTINCT rv."itemId" || '-' || rv."authorId") AS "reviews"
			FROM 
				"Item" i
			LEFT JOIN
				"Review" rv ON i."id" = rv."itemId"
			GROUP BY
				i."id"
		`
	)).map((i) => ({...i, rating: i.rating === null ? null : String(Math.round(i.rating * 100) / 100)}));
	// console.log("fetched products", products);
	return (
		<div className="flex-1 grid grid-cols-1 grid-rows-1">
			<main className="flex flex-col w-full p-6 pb-0 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">Shop Student Essentials</h2>
					<LayoutBtn />
				</div>

				<div className="flex flex-col md:flex-row gap-6 flex-1 relative">
					<FilterSection className="hidden md:block" />
					<div className="flex-1 space-y-4 flex flex-col">
						<SearchBar />
						<ScrollArea className="flex-1 [&>:first-of-type]:w-[calc(100%-0.5rem)] w-[calc(100%+0.5rem)]">
							<Products products={products} id={user.id} q={searchParams?.q} />
						</ScrollArea>
					</div>
				</div>
			</main>
		</div>
	);
}
