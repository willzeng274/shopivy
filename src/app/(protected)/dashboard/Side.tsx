import ShopIvyIcon from "@/components/icons/ShopIvy";
import { cn } from "@/utils/cn";
import { HomeIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default function Side() {
	return (
		<aside className="group/sidebar hidden w-16 hover:w-48 flex-col border-r md:flex transition-[width] duration-500 ease-in-out px-2">
			<SideNav />
		</aside>
	);
}

export function SideNav({ isSheet = false }: { isSheet?: boolean }) {
	return (
		<nav className={cn("grid gap-4 mt-4 [&>*]:pl-3", isSheet ? "text-lg" : "text-sm")}>
			<div className="flex items-center gap-2 rounded-md py-2 text-card-foreground">
				<div className="flex items-center justify-center w-6 h-6 bg-[#6FCF97] rounded-full flex-shrink-0">
					<ShopIvyIcon className="w-4 h-4 text-white" />
				</div>
				{!isSheet && <span className="text-sm font-semibold opacity-0 group-hover/sidebar:opacity-100 duration-200">ShopIvy</span>}
			</div>
			<SideLink isSheet={isSheet} href="/dashboard" icon={<HomeIcon className="h-5 w-5" />}>
				Home
			</SideLink>
			<SideLink isSheet={isSheet} href="/dashboard/cart" icon={<ShoppingCartIcon className="h-5 w-5" />}>
				Cart
			</SideLink>
			<SideLink isSheet={isSheet} href="/dashboard/customers" icon={<UsersIcon className="h-5 w-5" />}>
				Customers
			</SideLink>
		</nav>
	);
}

export function SideLink({
	href,
	icon,
	isSheet,
	children,
}: {
	href: string;
	icon: React.ReactNode;
	isSheet: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="flex items-center gap-3 rounded-md py-2 text-card-foreground transition-colors hover:bg-muted group/sidetab"
		>
			{icon}
			<span
				className={cn("group-hover/sidetab:translate-x-1 duration-200", {
					"opacity-0 group-hover/sidebar:opacity-100": !isSheet,
				})}
			>
				{children}
			</span>
		</Link>
	);
}