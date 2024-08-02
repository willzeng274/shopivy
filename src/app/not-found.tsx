import ShopIvyIcon from "@/components/icons/ShopIvy";
import { WavyBackground } from "@/components/ui/Wavy";
import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
	return (
		<div className="flex flex-col min-h-[100dvh] w-full justify-center items-center">
			<div className="flex flex-col items-center justify-center space-y-8">
				<div className="w-24 h-24 bg-[#6FCF97] rounded-full flex items-center justify-center">
					<ShopIvyIcon className="w-12 h-12 text-white" />
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold text-white">Oops!</h1>
					<p className="text-lg text-white">The page you're looking for doesn't exist.</p>
					<Link
						href="#"
						className="inline-flex items-center justify-center px-6 py-3 mt-6 text-lg font-bold text-[#6FCF97] bg-white rounded-full shadow-lg hover:bg-[#66D2EA] hover:text-white transition-colors"
						prefetch={false}
					>
						<HomeIcon className="w-6 h-6 mr-2" />
						Go to Home
					</Link>
				</div>
			</div>
		</div>
	);
}

function HomeIcon(props: React.HTMLAttributes<SVGElement>) {
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
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}
