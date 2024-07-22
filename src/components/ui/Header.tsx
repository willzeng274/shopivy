import { Cookie } from "next/font/google";
import { cookies, headers } from "next/headers";
import Link from "next/link";

const font_cookie = Cookie({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

const links = [
    { href: "/", label: "Home", validateSession: null },
	{ href: "/about", label: "About", validateSession: null },
	{ href: "/login", label: "Login", validateSession: true },
	{ href: "/signup", label: "Signup", validateSession: true },
	{ href: "/shop", label: "Shopping Cart", validateSession: false },
	{ href: "/profile", label: "Profile", validateSession: false },
];

export default function Header() {
	const cookieStore = cookies();
	const session = cookieStore.get("session");

    const headersList = headers();
    const url = headersList.get('x-current-path');

	return (
		<header className="px-4 lg:px-6 h-14 flex items-center bg-gray-800/90 text-white">
			<Link href="#" className="flex items-center justify-center" prefetch={false}>
				<ShoppingBagIcon className="h-10 w-10" />
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

function ShoppingBagIcon(props: React.HTMLAttributes<SVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="182 180 442 444" {...props}>
			<path
				fill="#F4F6F4"
				d="M389 180h29l24 3 21 5 18 6 20 9 13 7 11 7 11 8 9 7 14 12 12 13 13 17 13 21 11 23 10 30 5 25 1 9v35l-3 21-6 26-7 21-13 27-10 16-8 11-8 10-9 10-11 11-17 13-14 9-23 12-26 10-28 7-25 3h-29l-23-3-22-5-23-8-21-10-16-10-16-12-12-11-2-1v-2h-2v-2l-3-1-7-8-11-13-9-13-8-13-11-21-8-21-6-23-4-25-1-16v-17l3-25 6-26 7-20 10-21 12-19 10-13 9-10 7-8 8-8 11-9 11-9 17-11 23-12 18-7 25-7 19-3Z"
			/>
			<path
				fill="#15633A"
				d="M574 398h1l-1 34-1 12-8 14-7 11-11 8-7 4-7-1-2-1-6 12 14-7 6-2h28v2l-13 8-14 8-9 3-20 1-8 3-11 8-3 3 7-4 13-4h40l-5 4-15 12-19 13-20-2-6-1h-24l-13 4-12 5-16 8-11 8-5 4-1 4 6 10 11-13 10-9 12-8 10-5h31l16 1 18 3-3 3-27 14-16 8-7 4-46 5h-7l3 8-1 4h-4l-8-16-3-4-3 1-8 14-2 5-5-1 1-5 3-6h-12l-19-2-12-2-7-1-16-8-22-11-16-9v-1l15-2 2-1 17-1h18l13 2 10 5 12 9 12 12 5 7 4-5 4-5-2-4-14-11-12-7-26-10-4-1h-27l-14 2h-8l-15-10-18-13-6-4v-1l20-1h19l10 2 10 4 19 12-5-4-14-10-5-4-12-6-23-1-12-5-11-7-7-5-3-1v-2h23l12 3 9 4 6 3-7-10v-3l-4 3-9-3-12-7-7-8-10-19-1-1v-45l7 6 7 7 5 5 16 16 3 1 3 12 2 7 2 27 10 15 10 9 4 2-8-11-7-10-4-9v-8l4-16 4-15h2l10 19 6 13v21l-3 8v11l16 11-5-11-4-11v-16l2-4 2-9 3-6 5 5 9 10 16 15 6 11 5 16 3 14v5l6 2 12 7 11 9 4 3v2l11-9 12-9 9-5h2v-23l2-12 7-11 9-11 4-4 6 28 1 2v7l-13 12-8 7-1 1 18-7 9-4 4-4-4-13-1-13 7-13 7-11 6-9 3 1 4 16v19l-2 6-6 10-9 10-6 6 11-7 14-10 6-5-1-9-3-9v-19l5-12 4-8h2l1-5 4-7 2 1 6 29v8l-5 12-7 9-4 6v2l8-7 9-10 5-11 2-18 3-11 2-12 3-3 8-7 9-8 7-8 5-5Z"
			/>
			<path
				fill="#0D8A46"
				d="M387 193h33l23 3 15 4 19 6 13 6 14 7 17 11 4 2v2l5 2 14 12 12 11 7 8 10 12 10 15 8 15 8 17 10 34 4 21v7h-22l-4-24-8-26-7-17-6-12-9-14-8-10-10-12-5-5-14-12-10-7-14-9-16-9-16-6-13-4-24-5h-43l-20 3-12 3-13 4-11 5-16 8-16 10-11 9-10 9-9 8-9 11-11 14-9 16-7 14-5 13-6 24-2 10-1 11h-21v-9l3-19 5-19 4-12 5-12 11-21 8-12 8-10 11-13 17-17h2v-2l19-14 17-11 15-7 12-5 10-3 7-2 9-2 1-1 13-2 2-1Z"
			/>
			<path
				fill="#156639"
				d="M504 331h3l-1 5-8 16-9 20-7 14-3 6-18 4-16 4-6 2-14 3-13 5-5 3-2 18 6-8 7-7 9-6 10-4h37l8 1-5 5-16 13-13 10-5 4h-23l-13-2-2-1 4 16 4 27v38h-3l-7-8-3-3-4 1-8 5-8 4h-3l1-4 7-11 6-12 4-13 4-20v-17l-10 4h-19l-12-2v-2h-2l-6-7-5-5-15-15v-2l-4-2-2-4-4-2v-2l44 3 12 3 9 6 6 5 7 11v2l-4-1-18-8 1 4 21 8h2l2-18 3-10 3-5 3-8 7-11 10-15 9-11h2l2-4 7-5 27-7h6v-2l15-3Z"
			/>
			<path
				fill="#1A8B4C"
				d="m381 275 7 6 15 14 6 5 5 5 11 10 2 1 6 18v7l-3 11-8 16-11 16-4 6-2-3-2-29-1-4-4-1 1 3 1 20v42h-2l-3-5-12-14-8-8-4-6-5-5-5-9-3-8-1-14-1-5v-11l5-12 10-23 8-19Z"
			/>
			<path fill="#0E6338" d="m237 399 7 6 7 7 5 5 16 16 3 1 3 12 2 7 1 13v10l-1 3-4 3-9-3-12-7-7-8-10-19-1-1Z" />
			<path fill="#0F6739" d="M574 398h1l-1 34-1 12-8 14-7 11-11 8-7 4-7-1-3-1v-12l3-17 2-9 2-7 6-4 8-7 7-8 8-7Z" />
			<path fill="#117340" d="m536 299 2 1v2l5 2 11 10 6 4 5 1v12l-1 8-5 11-1 5-7-6-9-10-4-8-1-4Z" />
			<path fill="#13673A" d="M278 354h2l-2 5-8 16-7 9-7 3h-15l-15-2v-3l11-6 7-8 6-5 9-4Z" />
			<path fill="#116D3C" d="M266 299h1v21l-4 16-11 13-5 5-7-20v-15l7-3 13-12Z" />
			<path fill="#136A3C" d="m527 355 9 2 13 4 11 6 5 4 5 5 10 7-4 2-11 2h-16l-8-3-6-10-4-8-3-8Z" />
			<path fill="#1C613D" d="M529 477h1l-1 7-4 7 14-7 6-2h28v2l-13 8-14 8-9 3-20 1-7 1 2-4 9-9 4-6Z" />
			<path fill="#1E5C3F" d="m280 476 2 4 10 15 7 7v3l-6-2-23-1-12-5-11-7-7-5-3-1v-2h23l12 3 9 4 6 3-7-10Z" />
		</svg>
	);
}
