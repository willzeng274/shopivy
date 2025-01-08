import React from "react";

import { cn } from "@/utils/cn";
import { Cookie } from "next/font/google";
import { HoverCard } from "./HoverCard";
import ShopIvyIcon from "@/components/icons/ShopIvy";

const font_cookie = Cookie({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

const cardItems = [
	{
		id: 0,
		title: "Waterloo AIF",
		description: "Need help with Waterloo AIF? ShopIvy's got a service for that.",
	},
	{
		id: 1,
		title: "Warriors Goose Plushie",
		description: "Univeristy of Waterloo Goose Plushie (sm, md, lg, xl, 2xl) sizes offered",
	},
	{
		id: 2,
		title: "Apple Pro Stand",
		description: "Extra drippy stand for Mac Pro at your fingertips.",
	},
	{
		id: 3,
		title: "Paid Friends Service",
		description: "Need friends? ShopIvy's got you covered - on the expense of $49.99/hr.",
	},
	{
		id: 4,
		title: "UofT MATH137 Tutoring",
		description: "All tutors scored above 90% in MATH157. Charge rates may progressively increase.",
	},
	{
		id: 5,
		title: "Artificial General Intelligence",
		description: "AGI at your service! ($4999.99 per API call)",
	},
	{
		id: 6,
		title: "Artificial Super Intelligence",
		description: "World's first ASI service. It will cost you your life.",
	},
];

export interface PhoneProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactNode;
}

export default function Phone({ className, children }: PhoneProps) {
	return (
		<div
			className={cn(
				"bg-white text-black shadow border-4 border-gray-200 rounded-3xl p-2 z-40",
				"aspect-[270/537] w-auto h-[537px] max-h-[65dvh]",
				"hidden md:flex",
				"flex-col items-center",
				className
			)}
		>
			<div className="flex flex-row w-full items-center px-2">
				<div className="flex items-center justify-center w-4 h-4 shadow-lg">
					<ShopIvyIcon className="w-4 h-4 text-[#6FCF97]" />
				</div>
				<h1 className={cn("ml-1 flex-1 text-xs", font_cookie.className)}>ShopIvy</h1>
				<ShoppingBagIcon className="w-[6%] aspect-square h-auto" />
			</div>
			<h1 className="mt-10 mb-2">Browse Products & Services</h1>
			<div className="my-2 py-1 relative w-[calc(100%-1rem)] text-gray-600 flex border-2 border-gray-300 bg-white px-2 rounded-lg text-xs">
				<input
					className="focus:outline-none flex-1 w-full"
					type="search"
					name="search"
					placeholder="Search"
				/>
				<button type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlSpace="preserve"
						width={512}
						height={512}
						className="text-gray-600 h-4 w-4 fill-current"
						// style={{
						// 	enableBackground: "new 0 0 56.966 56.966",
						// } as CSSProperties}
						viewBox="0 0 56.966 56.966"
					>
						<path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" />
					</svg>
				</button>
			</div>
			<div className="overflow-y-auto flex-1">
				<HoverCard className="text-[length:0.6rem]" items={cardItems} />
			</div>
			{/* <div className="text-2xl">
                Test
            </div> */}
			{children}
		</div>
	);
}

function ShoppingBagIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
			<path d="M3 6h18" />
			<path d="M16 10a4 4 0 0 1-8 0" />
		</svg>
	);
}
