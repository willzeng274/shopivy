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

export const runtime = "edge";

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
								<Link href="#" className="inline-flex h-10 items-center justify-center" prefetch={false}>
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
									Shopping Assistant and Recommendation System with Cohere AI
								</div>
								<h2 className="text-3xl font-bold tracking-tighter text-[#2d3436] sm:text-5xl">
									Personalized Shopping Experience just for you
								</h2>
								<p className="max-w-[900px] text-[#2d3436] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									ShopIvy is ahead in the AI game to provide you a personalized shopping experience. Our AI system
									learns from your preferences and recommends products that you might like.
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
											<h3 className="text-xl font-bold text-[#2d3436]">Intelligent Product Discovery</h3>
											<p className="text-[#2d3436]">
												Shopivy AI learns from your preferences and recommends products that you might like.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold text-[#2d3436]">Smart Cart Optimization</h3>
											<p className="text-[#2d3436]">
												The AI system makes suggestions on what to add to your cart based on your shopping history.
											</p>
										</div>
									</li>
									<li>
										<div className="grid gap-1">
											<h3 className="text-xl font-bold text-[#2d3436]">Real-Time Shopping Insights</h3>
											<p className="text-[#2d3436]">
												Stay informed with instant updates on trending products and personalized offers.
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
								<h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Product and Service
								</h2>
								<p className="text-center text-gray-200 md:text-xl">
									We offer tech, supplies, textbooks, and other student services such as tutoring, proofreading, etc.
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<PencilIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">School Supplies</div>
								</div>
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<LaptopIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Tech Gadgets</div>
								</div>
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<BookIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Textbooks</div>
								</div>
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<BackpackIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Bags & Accessories</div>
								</div>
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<FriendsIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Friends</div>
								</div>
								<div className="group flex h-auto w-full items-center justify-start gap-1 rounded-md bg-white/10 p-4 text-sm font-medium transition-colors hover:bg-white/20 hover:cursor-pointer">
									<EditingIcon className="h-6 w-6 text-white" />
									<div className="text-sm font-medium leading-none group-hover:underline">Essay editing</div>
								</div>
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

function FriendsIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 -64 640 640"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
		</svg>
	);
}

function EditingIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="24"
			height="24"
			viewBox="0 0 494.936 494.936"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M389.844 182.85c-6.743 0-12.21 5.467-12.21 12.21v222.968c0 23.562-19.174 42.735-42.736 42.735H67.157c-23.562 0-42.736-19.174-42.736-42.735V150.285c0-23.562 19.174-42.735 42.736-42.735h267.741c6.743 0 12.21-5.467 12.21-12.21s-5.467-12.21-12.21-12.21H67.157C30.126 83.13 0 113.255 0 150.285v267.743c0 37.029 30.126 67.155 67.157 67.155h267.741c37.03 0 67.156-30.126 67.156-67.155V195.061c0-6.743-5.467-12.211-12.21-12.211z" />
			<path d="M483.876 20.791c-14.72-14.72-38.669-14.714-53.377 0L221.352 229.944c-.28.28-3.434 3.559-4.251 5.396l-28.963 65.069a12.203 12.203 0 0 0 2.521 13.6 12.214 12.214 0 0 0 8.639 3.576c1.675 0 3.362-.346 4.96-1.057l65.07-28.963c1.83-.815 5.114-3.97 5.396-4.25L483.876 74.169c7.131-7.131 11.06-16.61 11.06-26.692 0-10.081-3.929-19.562-11.06-26.686zM466.61 56.897 257.457 266.05c-.035.036-.055.078-.089.107l-33.989 15.131L238.51 247.3c.03-.036.071-.055.107-.09L447.765 38.058c5.038-5.039 13.819-5.033 18.846.005a13.205 13.205 0 0 1 3.905 9.414c0 3.559-1.389 6.903-3.906 9.42z" />
		</svg>
	);
}
