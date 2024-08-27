"use client";

import { Slider } from "@/components/ui/Slider";
import { useShopStore } from "@/utils/stores/shopStore";

function format(price: number) {
    price = Math.max(Math.min(price, 10001), 0);
    return price === 10001 ? "10000+" : price === 0 ? "FREE" : String(price);
}

export default function RangeSelect() {
	const priceRange = useShopStore((state) => state.priceRange);
	const setPriceRange = useShopStore((state) => state.setPriceRange);
	return (
		<>
			<Slider
				min={0}
				max={10001}
				value={priceRange}
				onValueChange={setPriceRange}
				className="w-full [&_.slider-track]:bg-slate-200 [&_.slider-track]:shadow-sm"
			/>
			<div className="flex justify-between mt-2 text-sm text-slate-600 font-medium">
				<span>
					$
					<span
						contentEditable
						suppressContentEditableWarning
						onBlur={(e) => {
							if (isNaN(+e.target.innerText)) {
								e.target.innerText = format(priceRange[0]);
                                return;
							}
							setPriceRange([+e.target.innerText, priceRange[1]]);
                            e.target.innerText = format(+e.target.innerText);
						}}
					>
						{format(priceRange[0])}
					</span>
				</span>
				<span>
					$
					<span
						contentEditable
						suppressContentEditableWarning
                        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
						onBlur={(e) => {
							if (isNaN(+e.target.innerText)) {
								e.target.innerText = format(priceRange[1]);
                                return;
							}
							setPriceRange([priceRange[0], +e.target.innerText]);
                            e.target.innerText = format(+e.target.innerText);
						}}
					>
						{format(priceRange[1])}
					</span>
				</span>
			</div>
		</>
	);
}
