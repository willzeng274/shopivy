import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Switch } from "@/components/ui/Switch";
import React from "react";

export default function Page() {
	return (
		<ScrollArea className="w-full flex-1">
			<main className="w-full p-6 bg-gradient-to-br from-slate-100 to-zinc-100 min-h-full">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Settings</h2>
				<div className="space-y-8">
					<section>
						<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">General Settings</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<Switch
									disabled
									id="color-mode"
									// checked={colorMode === "dark"}
									// onCheckedChange={toggleColorMode}
									className="data-[state=checked]:bg-green-600"
								/>
								<Label
									htmlFor="color-mode"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Color Mode
								</Label>
								<p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark mode</p>
							</div>
							<div className="flex items-center space-x-2">
								<Switch
									disabled
									id="sidebar-visibility"
									// checked={isSidebarVisible}
									// onCheckedChange={toggleSidebar}
									className="data-[state=checked]:bg-green-600"
								/>
								<Label
									htmlFor="sidebar-visibility"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Sidebar Visibility
								</Label>
								<p className="text-sm text-gray-500 dark:text-gray-400">Toggle sidebar visibility</p>
							</div>
						</div>
					</section>

					<section>
						<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Notification Settings</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<Checkbox id="email-notifications" disabled />
								<Label htmlFor="email-notifications">Receive email notifications</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="push-notifications" disabled />
								<Label htmlFor="push-notifications">Receive push notifications</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="order-updates" disabled />
								<Label htmlFor="order-updates">Order status updates</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox id="promotional-emails" disabled />
								<Label htmlFor="promotional-emails">Promotional emails</Label>
							</div>
						</div>
					</section>

					<section>
						<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Account Settings</h3>
						<div className="space-y-4">
							<div>
								<Label htmlFor="email" className="text-sm font-medium">
									Email Address
								</Label>
								<Input disabled id="email" type="email" placeholder="your@email.com" className="mt-1" />
							</div>
							<div>
								<Label htmlFor="password" className="text-sm font-medium">
									Change Password
								</Label>
								<Input disabled id="password" type="password" placeholder="New password" className="mt-1" />
							</div>
							<div>
								<Label className="text-sm font-medium">Preferred Language</Label>
								<RadioGroup disabled defaultValue="english" className="mt-2">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="english" id="english" />
										<Label htmlFor="english">English</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="french" id="french" />
										<Label htmlFor="french">French</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="spanish" id="spanish" />
										<Label htmlFor="spanish">Spanish</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
					</section>

					<section>
						<h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Privacy Settings</h3>
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<Checkbox disabled id="data-collection" />
								<Label htmlFor="data-collection">Allow data collection for personalized recommendations</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Checkbox disabled id="third-party-sharing" />
								<Label htmlFor="third-party-sharing">Allow sharing data with third-party partners</Label>
							</div>
							<div>
								<Label className="text-sm font-medium">Data Retention Period</Label>
								<RadioGroup disabled defaultValue="1year" className="mt-2">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="6months" id="6months" />
										<Label htmlFor="6months">6 months</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="1year" id="1year" />
										<Label htmlFor="1year">1 year</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="2years" id="2years" />
										<Label htmlFor="2years">2 years</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
					</section>
				</div>
			</main>
		</ScrollArea>
	);
}
