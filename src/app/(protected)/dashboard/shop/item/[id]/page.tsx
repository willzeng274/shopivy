import { fetchUserFromSess, prisma } from "@/utils/state";
import { Prisma, type Item } from "@prisma/client";
import { addToCart } from "../../actions";
import Image from "next/image";
import { formatter } from "@/utils/formatter";
import { CheckIcon, XIcon } from "lucide-react";
import Form from "../../_components/Form";

export default async function Item({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const product = (
		await prisma.$queryRaw<(Item & { rating: number | null; reviews: bigint })[]>(
			Prisma.sql`
			SELECT 
				i.*,
				AVG(rv.rating) AS "rating",
				COUNT(DISTINCT rv."itemId" || '-' || rv."authorId") AS "reviews"
			FROM 
				"Item" i
			LEFT JOIN
				"Review" rv ON i."id" = rv."itemId"
			WHERE i."id" = ${BigInt(params.id)}
			GROUP BY
				i."id"
		`
		)
	).map((i) => ({ ...i, rating: i.rating === null ? null : String(Math.round(i.rating * 100) / 100) }))[0];
	const user = await fetchUserFromSess();
	const addToCartWithProduct = addToCart.bind(null, user.id).bind(null, product);
	return (
		<div className="flex-1 grid grid-cols-1 grid-rows-1">
			<main className="flex flex-row gap-10 w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
                <div>
                    <Image
                        className={`w-80 aspect-square h-auto rounded-md flex-shrink-0`}
                        width={80}
                        height={80}
                        src={product.imageUrl ? product.imageUrl : "/goose_plush.jpg"}
                        alt="product-image"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
                        placeholder="blur"
                    />
                </div>
				<div className="gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
					<p className="text-lg font-bold text-blue-600">{formatter.format(product.price / 100)}</p>
					<div className="flex items-center mb-2 space-x-2">
						<span className="text-yellow-500">
							{product.rating
								? "★".repeat(Math.round(+product.rating)) + "☆".repeat(5 - Math.round(+product.rating))
								: "☆".repeat(5)}
						</span>
						<h6 className="inline-block text-sm">{`${Number(product.reviews)} reviews`}</h6>
					</div>
					<h3>{product.category}</h3>
					<p className="max-h-40 text-sm text-gray-600 break-words overflow-y-auto flex-grow hyphens-auto">
						{product.description}
					</p>
					{product.available ? (
						<span className="mb-2 text-green-600 text-sm flex items-center mt-1">
							<CheckIcon className="w-4 h-4 mr-1" /> In stock
						</span>
					) : (
						<span className="mb-2 text-red-600 text-sm flex items-center mt-1">
							<XIcon className="w-4 h-4 mr-1" /> Out of stock
						</span>
					)}
					<Form action={addToCartWithProduct}>
						<button
							disabled={!product.available}
							className="inline-flex items-center justify-center min-w-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
							type="submit"
						>
							Add to Cart
						</button>
					</Form>
				</div>
			</main>
		</div>
	);
}
