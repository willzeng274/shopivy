import { ScrollArea } from "@/components/ui/ScrollArea";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import Items from "./items";
import OrderSummary from "./order";

export default function Page() {
	return (
		<div className="flex-1">
			<main className="flex flex-col w-full p-6 pb-0 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Shopping Cart</h2>
				<div className="flex flex-col lg:flex-row gap-6 flex-1 relative">
					<div className="flex-grow h-0 lg:h-auto">
						<ScrollArea className="h-full [&>div>div]:space-y-4 pb-4 [&>:first-of-type]:w-[calc(100%-0.5rem)] w-[calc(100%+0.5rem)]">
							<Suspense
								fallback={[...Array(3)].map(() => (
									<div className="bg-white rounded-lg shadow flex">
										<Skeleton className="w-36 h-36 m-2 rounded-md" />
										<div className="flex-grow p-4 flex flex-col justify-between">
											<div>
												<div className="flex justify-between items-start">
													<div className="space-y-2">
														<Skeleton className="h-5 w-40" />
														<Skeleton className="h-3 w-72" />
														<Skeleton className="h-4 w-20" />
													</div>
													<div className="flex items-center space-x-2">
														<Skeleton className="h-8 w-24 rounded-md" />
														<Skeleton className="h-8 w-8 rounded-full" />
													</div>
												</div>
											</div>
											<Skeleton className="h-4 w-24 mt-4" />
										</div>
									</div>
								))}
							>
                                <Items />
                            </Suspense>
						</ScrollArea>
					</div>
					<div className="lg:w-80">
						<OrderSummary />
					</div>
				</div>
			</main>
		</div>
	);
}
