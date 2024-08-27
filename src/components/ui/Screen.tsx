import { cn } from "@/utils/cn";
import { formatter } from "@/utils/formatter";
import { ShoppingCartIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

export interface ScreenProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactNode;
}

interface CartItem {
	id: number;
	name: string;
	imageUrl: string;
	details: string[];
	price: number;
	quantity: number;
	available: boolean;
}

const cartItems: CartItem[] = [
	{
		id: 0,
		name: "ShopIvy Pin",
		imageUrl: "/logo.svg",
		details: ["Large", "White"],
		price: 499.99,
		quantity: 1,
		available: true,
	},
	{
		id: 1,
		name: "UWaterloo Plush Goose",
		imageUrl: "/goose_plush.jpg",
		details: ["EXTRA Extra Large"],
		price: 1999.99,
		quantity: 1,
		available: false,
	},
	{
		id: 2,
		name: "ECE124 Tutoring Session - Charged hourly",
		imageUrl: "/circuits.png",
		details: ["02/23/2025", "11:30AM-1:30PM"],
		price: 35.0,
		quantity: 2,
		available: true,
	},
];

const total = cartItems.reduce((prev, curr) => prev + curr.price, 0);

export default function Screen({ className, children }: ScreenProps) {
	return (
		<div
			className={cn(
				"bg-white/40 shadow rounded-2xl p-2 pr-6 z-30",
				"aspect-[975/571] w-auto max-w-full h-[571px] max-h-[70dvh]",
				"flex-col",
				"md:translate-x-[-15%] md:-translate-y-[10%]",
				"hidden md:flex",
				"test-aurora",
				className
			)}
		>
			<div className="flex flex-row items-center gap-x-2 px-4 py-[2%]">
				<ShoppingCartIcon className="h-4 w-4" />
				<h1 className="text-white font-bold">Shopping Cart</h1>
			</div>
			<div className="flex flex-col md:flex-row ml-[15%] flex-1 min-h-0">
				<div className="w-2/3 h-full [&>*]:border-t [&>*]:border-t-gray-400 [&>:last-child]:border-b [&>:last-child]:border-b-gray-400 p-2 mx-2 overflow-y-auto text-black bg-white/40 rounded-lg">
					{cartItems.map((item) => (
						<div className={cn("w-full flex flex-row gap-2 py-2", inter.className)} key={item.id}>
							<Image
								className="w-20 p-1 h-auto aspect-square self-center rounded-md"
								width={80}
								height={80}
								src={item.imageUrl}
								alt="product-image"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
								placeholder="blur"
							/>
							{/* <img className="w-20 p-1 h-auto aspect-square self-center rounded-md" src={item.imageUrl} alt="product image" /> */}
							<div className="flex flex-col gap-1">
								<h1 className="text-xs">{item.name}</h1>
								<div className="flex flex-row divide-x divide-gray-400 [&>:first-child]:pr-1 [&>:not(:first-child)]:px-1">
									{item.details.map((detail, idx) => (
										<h2 className="text-slate-500 text-[length:0.5rem] leading-3" key={idx}>
											{detail}
										</h2>
									))}
								</div>
								<h1 className="text-[length:0.5rem] leading-3">{formatter.format(item.price)}</h1>
								<span className="flex-1" />
								<div className="flex flex-row items-center gap-1">
									{item.available ? (
										<CheckmarkIcon className="h-2 w-2 text-green-700" />
									) : (
										<CrossIcon className="h-2 w-2 text-red-700" />
									)}
									<p className="text-[length:0.5rem] leading-3">{item.available ? "In stock" : "Out of stock"}</p>
								</div>
							</div>
							<span className="flex-1" />
							<div className="self-center pr-10 flex flex-row gap-[0.05rem]">
								<button className="h-4 w-4 border border-[#e4e4e7] rounded-md bg-white flex justify-center items-center hover:bg-[#f4f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
									<MinusIcon className="h-2 w-2" />
								</button>
								<input
									className="h-4 w-6 text-[length:0.5rem] border border-[#e4e4e7] rounded-md bg-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
									type="number"
									value={item.quantity}
									readOnly
								/>
								<button className="h-4 w-4 border border-[#e4e4e7] rounded-md bg-white flex justify-center items-center hover:bg-[#f4f4f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
									<PlusIcon className="h-2 w-2" />
								</button>
							</div>
							<XIcon className="m-1 h-4 w-4 text-gray-500 cursor-pointer" />
						</div>
					))}
				</div>
				<div className="flex flex-col w-1/3 h-fit rounded-xl bg-slate-100 p-4 text-black gap-4">
					<h1>Order summary</h1>
					<div className="flex flex-col [&>*]:border-b-gray-500 [&>*]:border-b text-gray-500">
						<div className="flex flex-row justify-between py-2 text-xs">
							<span>Subtotal</span>
							<span>{formatter.format(total)}</span>
						</div>
						<div className="flex flex-row justify-between py-2 text-xs">
							<span>Shipping estimate</span>
							<span>{formatter.format(5)}</span>
						</div>
						<div className="flex flex-row justify-between py-2 text-xs">
							<span>Tax estimate</span>
							<span>{formatter.format(total * 0.13)}</span>
						</div>
					</div>
					<div className="flex flex-row justify-between text-sm">
						<span>Order total</span>
						<span>{formatter.format(total * 1.13)}</span>
					</div>
					<button className="w-full py-1 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
						Checkout
					</button>
				</div>
			</div>
			{children}
		</div>
	);
}

function CheckmarkIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round" {...props}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="m15.56 4-.53.53-8.793 8.793a1.75 1.75 0 0 1-2.474 0l.53-.53-.53.53L.97 10.53.44 10 1.5 8.94l.53.53 2.793 2.793a.25.25 0 0 0 .354 0L13.97 3.47l.53-.53L15.56 4Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function CrossIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round" {...props}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="m12.47 13.53.53.53L14.06 13l-.53-.53L9.06 8l4.47-4.47.53-.53L13 1.94l-.53.53L8 6.94 3.53 2.47 3 1.94 1.94 3l.53.53L6.94 8l-4.47 4.47-.53.53L3 14.06l.53-.53L8 9.06l4.47 4.47Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function XIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

function MinusIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M5 12h14" />
		</svg>
	);
}

function PlusIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}
