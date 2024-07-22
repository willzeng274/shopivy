import { cookies } from "next/headers";
import Link from "next/link";

const links = [
	{ href: "/login", label: "Login", validateSession: true },
	{ href: "/signup", label: "Signup", validateSession: true },
	{ href: "/shop", label: "Shopping Cart", validateSession: false },
	{ href: "/profile", label: "Profile", validateSession: false },
];

export default function Footer() {
    const cookieStore = cookies();
	const session = cookieStore.get("session");
    
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 bg-[#2d3436] text-white">
			<p className="text-xs">&copy; 2024 ShopIvy. All rights reserved.</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
                {links
					.filter((link) => (link.validateSession === null || (Boolean(session) !== link.validateSession)))
					.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-xs hover:underline underline-offset-4"
							prefetch={false}
						>
							{link.label}
						</Link>
					))}
			</nav>
		</footer>
	);
}
