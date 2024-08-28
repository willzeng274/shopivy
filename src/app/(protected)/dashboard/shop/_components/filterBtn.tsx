"use client";

import { Button, ButtonProps } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useShopStore } from "@/utils/stores/shopStore";
import { Category } from "@prisma/client";

export default function FilterBtn({
	category,
	children,
    className,
	...props
}: { category: Category | "All" } & ButtonProps) {
	const setCategory = useShopStore((state) => state.setCategory);
	const selectedCategory = useShopStore((state) => state.selectedCategory);
	return (
		<Button
			className={cn(className, {
				"!bg-primary !text-primary-foreground": selectedCategory === category,
			})}
			onClick={() => setCategory(category)}
			{...props}
		>
			{children}
		</Button>
	);
}
