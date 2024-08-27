"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { Filter, GridIcon, LayoutListIcon } from "lucide-react";
import FilterSection from "./filter";
import { useShopStore } from "@/utils/stores/shopStore";

export default function LayoutBtn() {
    const toList = useShopStore((state) => state.toList);
    const toGrid = useShopStore((state) => state.toGrid);

	return (
		<div className="flex space-x-2">
			<Sheet>
				<SheetTrigger asChild>
					<button className="md:hidden bg-white shadow-sm h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors ring-1 ring-slate-200 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
						<Filter className="h-4 w-4" />
					</button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Filters</SheetTitle>
						<SheetDescription className="sr-only">Select filters to apply to your product search</SheetDescription>
					</SheetHeader>
					<FilterSection className="mt-4 [&>*]:border" />
				</SheetContent>
			</Sheet>
			<button
				className="bg-white shadow-sm h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors ring-1 ring-slate-200 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
				onClick={toGrid}
			>
				<GridIcon className="h-4 w-4" />
			</button>
			<button
				className="bg-white shadow-sm h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors ring-1 ring-slate-200 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
				onClick={toList}
			>
				<LayoutListIcon className="h-4 w-4" />
			</button>
		</div>
	);
}
