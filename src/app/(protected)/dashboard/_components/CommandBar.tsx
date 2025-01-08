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
import { usePopupStore } from "@/utils/stores/popupStore";
import { useCommandState } from "cmdk";
import { Calendar, Calculator, User, CreditCard, Settings } from "lucide-react";
import { useState } from "react";

export default function CommandBar() {
	const [search, setSearch] = useState("");
	return (
		<div className="relative">
			<Command className="rounded-lg border w-full">
				<CommandInput value={search} onValueChange={setSearch} className="min-w-[calc(12ch)] sm:min-w-[calc(25ch)]" placeholder="Type a command (*) or search..." />
				<CommandListWrapper setSearch={setSearch} />
			</Command>
		</div>
	);
}

function CommandListWrapper({
	setSearch,
}: {
	setSearch: (value: string) => void;
}) {
	const search = useCommandState((state) => state.search);
	const show = usePopupStore((state) => state.show);
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
					<CommandItem onSelect={() => { setSearch(""); show(); }}>
						<svg className="mr-2 h-4 w-4" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M24.3 44.7c2 0 6-.1 11.6-2.4 6.5-2.7 19.3-7.5 28.6-12.5 6.5-3.5 9.3-8.1 9.3-14.3C73.8 7 66.9 0 58.3 0h-36C10 0 0 10 0 22.3s9.4 22.4 24.3 22.4z"
								fillRule="evenodd"
								clipRule="evenodd"
								fill="#39594d"
							/>
							<path
								d="M30.4 60c0-6 3.6-11.5 9.2-13.8l11.3-4.7C62.4 36.8 75 45.2 75 57.6 75 67.2 67.2 75 57.6 75H45.3c-8.2 0-14.9-6.7-14.9-15z"
								fillRule="evenodd"
								clipRule="evenodd"
								fill="#d18ee2"
							/>
							<path
								d="M12.9 47.6C5.8 47.6 0 53.4 0 60.5v1.7C0 69.2 5.8 75 12.9 75c7.1 0 12.9-5.8 12.9-12.9v-1.7c-.1-7-5.8-12.8-12.9-12.8z"
								fill="#ff7759"
							/>
						</svg>
						<span>AI Assistant</span>
					</CommandItem>
					<CommandItem disabled>
						<Calendar className="mr-2 h-4 w-4" />
						<span>Calendar</span>
					</CommandItem>
					{/* <CommandItem>
						<Smile className="mr-2 h-4 w-4" />
						<span>Search Emoji</span>
					</CommandItem> */}
					<CommandItem disabled>
						<Calculator className="mr-2 h-4 w-4" />
						<span>Calculator</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem onSelect={() => setSearch("")}>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem onSelect={() => setSearch("")}>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
						<CommandShortcut>⌘B</CommandShortcut>
					</CommandItem>
					<CommandItem onSelect={() => setSearch("")}>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</div>
	);
}
