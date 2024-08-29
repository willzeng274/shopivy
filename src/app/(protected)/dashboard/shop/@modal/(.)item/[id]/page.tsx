import { DialogClose, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/Dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import Portal from "./portal";
import { fetchUserFromSess, prisma } from "@/utils/state";
import Form from "../../../_components/Form";
import { addToCart } from "../../../actions";
import { CheckIcon, Expand, X, XIcon } from "lucide-react";
import { Prisma, type Item } from "@prisma/client";
import Image from "next/image";
import { formatter } from "@/utils/formatter";
import ModalDialog from "./dialog";
import Link from "next/link";

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
		<ModalDialog>
			<Portal>
				<DialogOverlay />
				{/* <DialogContent
					className={
						"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
					}
				>
					<h1>item {params.id} 🤡</h1>
					<p>you already saw everything my guy</p>
					<Close />
				</DialogContent> */}
				<DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
					<DialogHeader>
						<DialogTitle>{product.name}</DialogTitle>
						<DialogDescription>{product.category}</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<Image
							className={`w-full aspect-square h-auto rounded-md`}
							width={80}
							height={80}
							src={product.imageUrl ? product.imageUrl : "/goose_plush.jpg"}
							alt="product-image"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
							placeholder="blur"
						/>
						<p className="text-sm text-gray-600">{}</p>
						<div className="flex items-center mb-2 space-x-2">
							<span className="text-yellow-500">
								{product.rating
									? "★".repeat(Math.round(+product.rating)) + "☆".repeat(5 - Math.round(+product.rating))
									: "☆".repeat(5)}
							</span>
							<h6 className="inline-block text-sm">{`${Number(product.reviews)} reviews`}</h6>
						</div>
						<p className="max-h-40 text-sm text-gray-600 break-words overflow-y-auto flex-grow hyphens-auto">
							{product.description}
						</p>
						<p className="text-lg font-bold text-blue-600">{formatter.format(product.price / 100)}</p>
						{product.available ? (
							<span className="mb-2 text-green-600 text-sm flex items-center mt-1">
								<CheckIcon className="w-4 h-4 mr-1" /> In stock
							</span>
						) : (
							<span className="mb-2 text-red-600 text-sm flex items-center mt-1">
								<XIcon className="w-4 h-4 mr-1" /> Out of stock
							</span>
						)}
					</div>
					<Form action={addToCartWithProduct}>
						<button
							disabled={!product.available}
							className="inline-flex items-center justify-center min-w-0 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
							type="submit"
						>
							Add to Cart
						</button>
					</Form>
					<DialogClose asChild>
						<button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</button>
					</DialogClose>
					<Link href={`/dashboard/shop/item/${product.id}`} className="absolute right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
						<Expand className="h-4 w-4" />
						<span className="sr-only">Expand</span>
					</Link>
				</DialogContent>
			</Portal>
		</ModalDialog>
	);
}
