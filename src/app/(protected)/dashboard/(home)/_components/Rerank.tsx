import { prisma, Purchase } from "@/utils/state";
import { Item, Prisma } from "@prisma/client";
import { CohereClient } from "cohere-ai";
import Link from "next/link";

// ENV: CO_API_KEY
const cohere = new CohereClient({});

export default async function Rerank({
    purchases,
}: {
    purchases: Purchase[];
}) {
    if (!purchases.length) {
        return (
            <div>
                <p>No purchase history found.</p>
            </div>
        );
    }

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
    )).map((i) => ({ ...i, rating: i.rating === null ? null : String(Math.round(i.rating * 100) / 100) }));

    const filtered = products.reduce((acc, product) => {
        if (!product.available) {
            return acc;
        }
        // prompt engineer every field of the product
        // each is supposed to be a sentence describing the product
        return {
            documents: [...acc.documents, `
                The product's name is ${product.name}, is in category ${product.category}, costs ${product.price}, and has ${product.reviews} reviews.
                The product's rating is ${product.rating}.
    
                ${product.description}
            `],
            products: [...acc.products, product]
        };
    }, {
        documents: [] as string[],
        products: [] as typeof products
    });

    const rerank = await cohere.v2.rerank({
        documents: filtered.documents,
        query: `
            The user has bought ${purchases.length} items.

            The following are the user's past purchases:
            ${purchases.map(purchase => `
                - Bought ${purchase.quantity} of "${purchase.name}" 
                  in category ${purchase.category} 
                  for ${purchase.price} each
                  on ${purchase.orderedAt?.toLocaleDateString()}
            `).join('\n')}

            Rank the items in the shop by relevance based on the user's purchase history. 
            Prioritize items similar in category, style, or complementary to past purchases.
            Consider quantity purchased and purchase recency.
        `,
        topN: 5, // top 5 recommendations
        model: 'rerank-v3.5',
    });

    return (
        <>
            {rerank.results.map(({ index, relevanceScore }) => (
                <Link key={filtered.products[index].id} href={`/shop/item/${filtered.products[index].id}`}>
                    <div className="flex items-center gap-4 p-4 border rounded-lg mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{filtered.products[index].name}</h3>
                            <p className="text-sm text-gray-600">{filtered.products[index].description}</p>
                            <div className="mt-2">
                                <span className="font-medium">${filtered.products[index].price}</span>
                                {filtered.products[index].rating && (
                                    <span className="ml-4">⭐ {filtered.products[index].rating}</span>
                                )}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Match score: {(relevanceScore * 100).toFixed(1)}%
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}