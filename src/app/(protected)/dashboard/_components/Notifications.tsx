import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/Dropdown";
import { cn } from "@/utils/cn";
import { BellIcon, Calendar, LucideProps, MessageSquare, RefreshCcw } from "lucide-react";
import Link from "next/link";

const notifications = [
	{
		icon: MessageSquare,
		title: "New message from Mesut Özil",
		description: "",
		time: "2 min ago",
		isUnread: true,
	},
	{
		icon: RefreshCcw,
		title: "Order update",
		description: "Your order for the 'Waterloo > Toronto Shirt' has been updated",
		time: "1 hour ago",
		isUnread: true,
	},
	{
		icon: Calendar,
		title: "Reminder",
		description: "Your account will be deleted in 3 days due to insufficient payment",
		time: "3 hours ago",
		isUnread: false,
	},
];

export default function Notifications() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="hover:bg-accent hover:text-accent-foreground h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
					<BellIcon className="h-5 w-5" />
					<span className="sr-only">Toggle notifications menu</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80">
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{notifications.length ? (
					<>
						{notifications.map((notification, index) => (
							<DropdownMenuItem key={index} className="focus:bg-muted">
								<NotificationItem {...notification} />
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-center cursor-pointer">
							<Link href="/dashboard/notifications">
								View all notifications
							</Link>
						</DropdownMenuItem>
					</>
				) : (
					<DropdownMenuItem className="hover:!bg-[initial]">No notifications.</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function NotificationItem({
	icon: Icon,
	title,
	description,
	time,
	isUnread,
}: {
	icon: React.FC<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
	title: string;
	description: string;
	time: string;
	isUnread: boolean;
}) {
	return (
		<div className={cn("flex items-start gap-4 p-2 rounded-md transition-colors")}>
			<div
				className={cn("mt-1 rounded-full p-1", isUnread ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
			>
				<Icon className="h-4 w-4" />
			</div>
			<div className="flex-1 space-y-1">
				<p className="text-sm font-medium leading-none">{title}</p>
				<p className="text-sm text-muted-foreground">{description}</p>
				<p className="text-xs text-muted-foreground">{time}</p>
			</div>
			{isUnread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
		</div>
	);
}
