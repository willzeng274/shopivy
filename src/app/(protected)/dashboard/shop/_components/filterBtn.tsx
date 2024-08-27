"use client";

import { useShopStore } from "@/utils/stores/shopStore";
import { Category } from "@prisma/client";

export default function FilterBtn({ category, children, ...props }: { category: Category | "All", children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>) {
    const setCategory = useShopStore((state) => state.setCategory);
    return (
        <button onClick={() => setCategory(category)} {...props}>
            {children}
        </button>
    );
}