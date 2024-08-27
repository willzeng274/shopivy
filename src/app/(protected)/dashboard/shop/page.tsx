import FilterSection from "./_components/filter";
import LayoutBtn from "./_components/LayoutBtn";
import { ScrollArea } from "@/components/ui/ScrollArea";
import Products from "./_components/products";
import { Item, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

export default async function Page() {
	const products = (await prisma.$queryRaw<(Item & { rating: number | null })[]>(
		Prisma.sql`
			SELECT 
				i.*,
				AVG(rv.rating) AS "rating"
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
		<div className="flex-1">
			<main className="flex flex-col w-full p-6 pb-0 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">Shop Student Essentials</h2>
					<LayoutBtn />
				</div>

				<div className="flex flex-col md:flex-row gap-6 flex-1 relative">
					<FilterSection className="hidden md:block" />
					<div className="flex-1">
						<ScrollArea className="h-full">
							<Products products={products} />
						</ScrollArea>
					</div>
				</div>
			</main>
		</div>
	);
}
