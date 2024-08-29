import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import { Category } from "@prisma/client";
import FilterBtn from "./_components/filterBtn";
import RangeSelect from "./_components/range";

export default function FilterSection({ className }: { className?: string }) {
	return (
		<aside className={cn("w-full min-w-48 md:w-64 space-y-6", className)}>
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<h3 className="text-lg font-semibold text-gray-700 p-4 bg-indigo-50">Categories</h3>
				<ScrollArea className="h-64 w-full">
					<div className="p-2">
						<FilterBtn
							category="All"
							variant="ghost"
							className="w-full justify-between text-left font-normal text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-md px-4 py-2"
						>
							All
							<ChevronRight className="h-4 w-4" />
						</FilterBtn>
						{Object.values(Category).map((category, index) => (
							<FilterBtn
								key={index}
								category={category}
								variant="ghost"
								className="w-full justify-between text-left font-normal text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-md px-4 py-2"
							>
								{category}
								<ChevronRight className="h-4 w-4" />
							</FilterBtn>
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="bg-white rounded-lg shadow-md p-4">
				<h3 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h3>
				<RangeSelect />
			</div>
		</aside>
	);
}
