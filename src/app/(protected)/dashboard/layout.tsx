import Side, { SideNav } from "./_components/Side";
import { MenuIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import Notifications from "./_components/Notifications";
import Profile from "./_components/Profile";
import CommandBar from "./_components/CommandBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="group/dashboard flex h-dvh w-full bg-background">
			<Side />
			<div className="flex flex-1 flex-col min-w-0 w-full">
				<header className="bg-white shadow-sm sticky z-50">
					<div className="flex items-center py-3 px-4 space-x-4">
						<Sheet>
							<SheetTrigger asChild>
								<button className="md:hidden h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
									<MenuIcon className="h-6 w-6" />
									<span className="sr-only">Toggle menu</span>
								</button>
							</SheetTrigger>
							<SheetContent side="left" className="md:max-w-xs">
								<SideNav isSheet />
							</SheetContent>
						</Sheet>
						<CommandBar />
						{/* <div className="relative">
							<SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
								placeholder="Search for products..."
							/>
						</div> */}
						<span className="flex-1" />
						<div className="flex items-center space-x-4">
							<Notifications />
							<Profile />
						</div>
					</div>
				</header>
				<ScrollArea className="w-full">{children}</ScrollArea>
			</div>
		</div>
	);
}
