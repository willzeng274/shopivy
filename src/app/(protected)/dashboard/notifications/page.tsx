import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Bell, Calendar, Check, MessageSquare, Package, X } from "lucide-react";
import Toaster from "./toaster";

const notifications = [
	{
		id: 1,
		type: "message",
		title: "New message from Mesut Özil",
		description: "",
		time: "2 min ago",
		read: false,
	},
	{
		id: 2,
		type: "order",
		title: "Order update",
		description: "Your order for the 'Waterloo > Toronto Shirt' has been updated",
		time: "1 hour ago",
		read: false,
	},
	{
		id: 3,
		type: "reminder",
		title: "Reminder",
		description: "Your account will be deleted in 3 days due to insufficient payment",
		time: "3 hours ago",
		read: false,
	},
	// Add more notifications here...
];

const getIcon = (type: string) => {
	switch (type) {
		case "message":
			return <MessageSquare className="h-5 w-5" />;
		case "order":
			return <Package className="h-5 w-5" />;
		case "reminder":
			return <Calendar className="h-5 w-5" />;
		default:
			return <Bell className="h-5 w-5" />;
	}
};

export default function Page() {
	return (
        <ScrollArea className="w-full flex-1">
            <Toaster />
			<main className="w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold">All Notifications</h1>
						<Button variant="outline">Mark all as read</Button>
					</div>
					<Card>
						<CardContent className="p-0">
							<ul className="divide-y">
								{notifications.map((notification) => (
									<li key={notification.id} className="flex items-start space-x-4 p-4">
										<div
											className={`flex-shrink-0 p-2 rounded-full ${
												notification.read ? "bg-gray-100" : "bg-blue-100"
											}`}
										>
											{getIcon(notification.type)}
										</div>
										<div className="flex-grow">
											<h3 className="font-semibold">{notification.title}</h3>
											{notification.description && <p className="text-gray-600">{notification.description}</p>}
											<p className="text-sm text-gray-500 mt-1">{notification.time}</p>
										</div>
										<Button variant="ghost" size="sm">
											{notification.read ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
										</Button>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</main>
		</ScrollArea>
	);
}
