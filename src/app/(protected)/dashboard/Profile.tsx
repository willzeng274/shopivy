import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/Dropdown";
import { UserIcon } from "lucide-react";
import Form from "./Form";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";

const prisma = new PrismaClient();

export default function Profile() {
	async function handleLogout() {
		"use server";
		const cookieStore = cookies();

		await prisma.session.delete({
			where: {
				id: cookieStore.get("ivysess")?.value!,
			},
		});

		cookieStore.delete("ivysess");

		permanentRedirect("/auth/login");
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
					{/* <SettingsIcon className="h-5 w-5" /> */}
					<UserIcon className="h-5 w-5" />
					<span className="sr-only">Toggle profile</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>
					<Form className="w-full" action={handleLogout}>
						<button className="w-full text-start" type="submit">
							Logout
						</button>
					</Form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
