// import Image from "next/image";
import Link from "next/link";
import { Luckiest_Guy } from "next/font/google";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Phone from "@/components/ui/Phone";
import Screen from "@/components/ui/Screen";
import { AIBeam } from "@/components/ui/AIBeam";

const font_luck = Luckiest_Guy({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

export default async function Home() {
	return (
		<div className="flex flex-col min-h-[100dvh]">
			<div className="flex flex-col h-[calc(100dvh+2.5em)]">
				<Header />
				{/* bg-gradient-to-br from-[#6366f1] to-[#9333ea] */}
				{/* bg-gradient-to-br from-[#6c5ce7] via-[#76b9f7] to-[#a29bfe]*/}
				{/* #ee7752, #e73c7e, #23a6d5, #23d5ab */}
				<section className="flex flex-grow min-h-0 items-center justify-center w-full bg-[length:400%_400%] bg-gradient-home text-white animate-gradient">
					<div className="flex flex-col md:flex-row w-full py-4 px-4 gap-10 lg:gap-40 md:px-8 lg:px-12 overflow-x-clip">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className={"text-7xl sm:text-9xl font-bold tracking-tighter " + font_luck.className}>ShopIvy</h1>
								<p className="max-w-[600px] text-gray-200 md:text-xl">
									The destination for students to find school-related products and services.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link
									href="#"
									className="inline-flex h-10 items-center justify-center"
									prefetch={false}
								>
									<ShimmerButton
										shimmerColor="#6366f1"
										background="white"
										hoverBackground="rgb(229,231,235)"
										borderRadius="0.375rem"
										shimmerSize="0.1em"
										className="px-8 w-full h-full text-[#6366f1] text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									>
										Shop Now
									</ShimmerButton>
								</Link>
								<Link
									href="#"
									className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-[#6366f1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<button>Learn More</button>
								</Link>
							</div>
						</div>
						<div className="flex flex-1 items-center justify-center my-4">
							<Phone />
							<Screen />
						</div>
					</div>
				</section>
			</div>
			<main className="flex flex-col flex-1">
				<div className="absolute -translate-y-10 w-full h-10 bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e] rounded-[28%_72%_0%_100%_/_100%_66%_34%_0%]" />
				<section className="flex justify-center w-full py-6 md:py-12 lg:py-16 bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e]">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-[#55efc4] px-3 py-1 text-sm text-[#2d3436]">
									Order Management assisted by Cohere AI
								</div>
								<h2 className="text-3xl font-bold tracking-tighter text-[#2d3436] sm:text-5xl">
									Personalized Order Management Just For You
								</h2>
								<p className="max-w-[900px] text-[#2d3436] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									ShopIvy is ahead in the AI game to provide you a personalized order management system.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
							<AIBeam className="mx-auto rounded-xl sm:w-full lg:order-last" />
							{/* <img
								src="/placeholder.svg"
								width="550"
								height="310"
								alt="Feature Image"
								className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
							/> */}
							<div className="flex flex-col justify-center space-y-4">
								<ul className="grid gap-6">
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold text-[#2d3436]">Track your shipments</h3>
											<p className="text-[#2d3436]">
												ShopIvy's AI brings you straight to the shipments and shows you their corresponding status.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold text-[#2d3436]">Modify your orders</h3>
											<p className="text-[#2d3436]">
												Our AI can help you perform actions on an existing order, making order modification intuitive.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold text-[#2d3436]">User-friendly Return System</h3>
											<p className="text-[#2d3436]">
												Return items with ease, unlike the majority of other e-commerce providers.
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<div>
					<div className="absolute w-full h-10 bg-gradient-to-r from-[#ffeaa7] to-[#fdcb6e] rounded-[0%_100%_24%_76%_/_46%_0%_100%_54%]" />
				</div>
				<section className="flex justify-center w-full pt-20 pb-10 md:pt-32 md:pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-br from-[#6366f1] to-[#9333ea] text-white">
					<div className="container px-8 md:px-12">
						<div className="flex flex-col justify-center space-y-8">
							<div className="space-y-2">
								<h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Product and Service</h2>
								<p className="text-center text-gray-200 md:text-xl">
									We offer tech, supplies, textbooks, and other student services such as tutoring, proofreading, etc.
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<PencilIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">School Supplies</div>
								</Link>
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<LaptopIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Tech Gadgets</div>
								</Link>
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<BookIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Textbooks</div>
								</Link>
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<BackpackIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Bags & Accessories</div>
								</Link>
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<BookIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Textbooks</div>
								</Link>
								<Link
									href="#"
									className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									<BackpackIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Bags & Accessories</div>
								</Link>
							</div>
						</div>
						{/* <div className="flex justify-center">
							<Image
								src="/"
								width="400"
								height="400"
								alt="Product"
								className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
							/>
						</div> */}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

function BackpackIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
			<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
			<path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
			<path d="M8 10h8" />
			<path d="M8 18h8" />
		</svg>
	);
}

function BookIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
		</svg>
	);
}

function LaptopIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
		</svg>
	);
}

function PencilIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
			<path d="m15 5 4 4" />
		</svg>
	);
}
