"use client";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/Command";
import { cn } from "@/utils/cn";
import { useCommandState } from "cmdk";
import { Calendar, Smile, Calculator, User, CreditCard, Settings } from "lucide-react";

export default function CommandBar() {
	return (
		<div className="relative">
			<Command className="rounded-lg border w-full">
				<CommandInput className="min-w-[calc(23ch)]" placeholder="Type a command or search..." />
				<CommandListWrapper />
			</Command>
		</div>
	);
}

function CommandListWrapper() {
	const search = useCommandState((state) => state.search);
	return (
		<div
			className={cn("absolute w-full top-full left-0 z-50 bg-white rounded-lg border", {
				"border-y-0": search === "",
				"shadow-md": search !== "",
			})}
		>
			<CommandList hidden={search === ""}>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<Calendar className="mr-2 h-4 w-4" />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<Smile className="mr-2 h-4 w-4" />
						<span>Search Emoji</span>
					</CommandItem>
					<CommandItem disabled>
						<Calculator className="mr-2 h-4 w-4" />
						<span>Calculator</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
						<CommandShortcut>⌘B</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</div>
	);
}
