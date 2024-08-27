import { Button } from "@/components/ui/Button";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";
import { formatter } from "@/utils/formatter";
import { fetchUserFromSess } from "@/utils/state";
import { Category, Prisma, PrismaClient } from "@prisma/client";
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import Image from "next/image";

const prisma = new PrismaClient({
	log: [
		"info",
		"warn",
		"error",
		{
			emit: "event",
			level: "query",
		},
	],
});

prisma.$on("query", (e) => {
	console.log("Query: " + e.query);
	console.log("Duration: " + e.duration + "ms");
});

interface CartItemFormat {
	itemId: bigint;
	quantity: number;
	name: string;
	price: number;
	detailsList: string[];
	imageUrl: string;
	category: Category;
	available: boolean;
}

export default async function Items() {
	const user = await fetchUserFromSess();

	console.log(user.id);

	const cartItems = await prisma.$queryRaw<CartItemFormat[]>(
		Prisma.sql`
            SELECT
                ci."itemId", ci.quantity, it.name, it.price, it."imageUrl", it.category, it.available, COALESCE(array_agg(itd.detail) FILTER (WHERE itd.detail IS NOT NULL), '{}') AS "detailsList"
            FROM "CartItem" ci
            JOIN "Item" it ON it.id = ci."itemId"
            LEFT JOIN "CartItemDetail" cid ON cid."cartItemId" = ci."itemId" AND cid."cartUserId" = ci."userId"
            LEFT JOIN "ItemDetail" itd ON itd.id = cid."itemDetailId"
            WHERE ci."userId" = ${user.id} AND ci.ordered = FALSE
            GROUP BY ci."itemId", ci.quantity, it.name, it.price, it."imageUrl", it.category, it.available
        `
	);

	console.log("items", cartItems);

	return (
		<>
			{cartItems.length ? (
				cartItems.map((item) => (
					<div key={item.itemId.toString()} className="bg-white rounded-lg shadow flex">
						<Image
							className="w-36 m-2 h-auto aspect-square self-center rounded-md"
							width={80}
							height={80}
							src="/goose_plush.jpg"
							alt="product-image"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
							placeholder="blur"
						/>
						<div className="flex-grow p-4 flex flex-col justify-between">
							<div>
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-semibold text-gray-800">{item.name}</h3>
										<ScrollArea className="h-5 max-w-72">
											<div className="flex flex-row divide-x divide-gray-400 [&>:first-child]:pr-1 [&>:not(:first-child)]:px-1 max-w-full">
												{item.detailsList.length ? (
													item.detailsList.map((detail, idx) => (
														<h2 className="text-slate-500 text-xs text-nowrap" key={idx}>
															{detail}
														</h2>
													))
												) : (
													<h2 className="text-slate-500 text-xs text-nowrap">Default</h2>
												)}
											</div>
											<ScrollBar className="h-2" orientation="horizontal" />
										</ScrollArea>
										<p className="font-semibold text-gray-900">{formatter.format(item.price / 100)}</p>
									</div>
									<div className="flex items-center space-x-2">
										<div className="flex items-center space-x-1 bg-gray-100 rounded-md">
											<Button variant="ghost" size="sm" aria-label="Decrease quantity" className="h-8 w-8 p-0">
												<MinusIcon className="h-3 w-3" />
											</Button>
											<span className="w-6 text-center text-sm">{item.quantity}</span>
											<Button variant="ghost" size="sm" aria-label="Increase quantity" className="h-8 w-8 p-0">
												<PlusIcon className="h-3 w-3" />
											</Button>
										</div>
										<Button variant="ghost" size="sm" aria-label="Remove item" className="h-8 w-8 p-0">
											<TrashIcon className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
							<p className="text-sm">
								{item.available ? (
									<span className="text-green-600 flex items-center">
										<CheckIcon className="w-4 h-4 mr-1" /> In stock
									</span>
								) : (
									<span className="text-red-600 flex items-center">
										<XIcon className="w-4 h-4 mr-1" /> Out of stock
									</span>
								)}
							</p>
						</div>
					</div>
				))
			) : (
				<>Nothing here. GO BUY SOMETHING!</>
			)}
		</>
	);
}
