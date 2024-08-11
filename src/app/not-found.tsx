import ShopIvyIcon from "@/components/icons/ShopIvy";
import { HomeIcon } from "lucide-react";
// import { WavyBackground } from "@/components/ui/Wavy";
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
						href="/"
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
