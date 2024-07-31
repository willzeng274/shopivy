import { Cookie } from "next/font/google";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import ShopIvyIcon from "@/components/icons/ShopIvy";

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
	{ href: "/profile", label: "Profile", validateSession: false },
];

export default function Header() {
	const cookieStore = cookies();
	const session = cookieStore.get("ivysess");

    const headersList = headers();
    const url = headersList.get('x-current-path');

	return (
		<header className="absolute w-full px-4 lg:px-6 h-14 py-2 flex items-center bg-transparent text-black">
			<Link href="/" className="flex items-center justify-center" prefetch={false}>
				<ShopIvyIcon className="h-10 w-10" />
                <span className={"ml-2 font-bold text-xl " + font_cookie.className}>ShopIvy</span>
				<span className="sr-only">shopivy</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				{links
					.filter((link) => link.href !== url && (link.validateSession === null || (Boolean(session) !== link.validateSession)))
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
		</header>
	);
}

// const pathname = usePathname()