import { Cookie } from "next/font/google";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import ShopIvyIcon from "@/components/icons/ShopIvy";
import { cn } from "@/utils/cn";
import ScrollBg from "./ScrollBg";

const font_cookie = Cookie({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

const links = [
	// { href: "/", label: "Home", validateSession: null },
	{ href: "/about", label: "About", validateSession: null },
	{ href: "/auth/login", label: "Login", validateSession: true },
	{ href: "/auth/signup", label: "Signup", validateSession: true },
	{ href: "/shop", label: "Cart", validateSession: false },
	{ href: "/dashboard", label: "Dashboard", validateSession: false },
];

export default function Header() {
	const cookieStore = cookies();
	const session = cookieStore.get("ivysess");

	const headersList = headers();
	const url = headersList.get("x-current-path");

	return (
		<ScrollBg as="header" className="fixed w-full px-4 lg:px-6 h-14 py-2 flex items-center z-[10000] text-white transition-[background-color] duration-500 ease-in-out">
			<Link href="/" className="flex items-center justify-center" prefetch={false}>
				<div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg">
					<ShopIvyIcon className="w-6 h-6 text-[#6FCF97]" />
				</div>
				<span className={cn("ml-2 font-bold text-xl", font_cookie.className)}>ShopIvy</span>
				<span className="sr-only">shopivy</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				{links
					.filter((link) => link.href !== url && (link.validateSession === null || Boolean(session) !== link.validateSession))
					.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm font-medium hover:underline underline-offset-4"
							prefetch={false}
						>
							{link.label}
						</Link>
					))}
			</nav>
		</ScrollBg>
	);
}

// const pathname = usePathname()
