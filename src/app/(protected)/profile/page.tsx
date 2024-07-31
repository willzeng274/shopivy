import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Form from "./Form";

const prisma = new PrismaClient();

export default async function Page() {
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
		<div className="flex flex-col min-h-screen bg-background">
			<header className="bg-muted px-4 py-3 sm:px-6 sm:py-4 flex flex-row">
				<div className="container mx-auto flex items-center justify-between">
					<a className="flex items-center gap-2" href="#">
						<span className="text-lg font-semibold">Profile dashboard (under construction)</span>
					</a>
				</div>
				<Form action={handleLogout}>
					<button type="submit">Logout</button>
				</Form>
			</header>
			<main className="container mx-auto py-8 px-4 sm:px-6">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<div className="flex items-center gap-4">
								<span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
									<img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
								</span>
								<div>
									<h3 className="text-lg font-semibold">John Doe</h3>
									<p className="text-muted-foreground">john@example.com</p>
								</div>
							</div>
						</div>
						<div className="p-6">
							<div className="grid gap-4">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Orders</span>
									<span className="font-medium">24</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Wishlist</span>
									<span className="font-medium">12</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Viewed</span>
									<span className="font-medium">48</span>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6">
							<button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="mr-2 h-4 w-4"
								>
									<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
									<path d="M14 2v4a2 2 0 0 0 2 2h4" />
									<path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
								</svg>
								Edit Profile
							</button>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Order History</h3>
						</div>
						<div className="p-6">
							<div className="grid gap-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">#1234</p>
										<p className="text-muted-foreground text-sm">June 15, 2023</p>
									</div>
									<div
										className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
										data-v0-t="badge"
									>
										Delivered
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">#1235</p>
										<p className="text-muted-foreground text-sm">June 10, 2023</p>
									</div>
									<div
										className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
										data-v0-t="badge"
									>
										Pending
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">#1236</p>
										<p className="text-muted-foreground text-sm">June 5, 2023</p>
									</div>
									<div
										className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
										data-v0-t="badge"
									>
										Delivered
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6">
							<a className="text-primary" href="#">
								View all orders
							</a>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Wishlist</h3>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-2 gap-4">
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Cozy Sweater</p>
										<p className="text-muted-foreground text-sm">$49.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										style={{}}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Leather Backpack</p>
										<p className="text-muted-foreground text-sm">$99.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Wireless Earbuds</p>
										<p className="text-muted-foreground text-sm">$79.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Minimalist Watch</p>
										<p className="text-muted-foreground text-sm">$149.99</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6">
							<a className="text-primary" href="#">
								View all wishlist
							</a>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Recently Viewed</h3>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-2 gap-4">
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Comfy T-Shirt</p>
										<p className="text-muted-foreground text-sm">$24.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										style={{}}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Stylish Sunglasses</p>
										<p className="text-muted-foreground text-sm">$39.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										style={{}}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Sleek Laptop Sleeve</p>
										<p className="text-muted-foreground text-sm">$29.99</p>
									</div>
								</div>
								<div className="relative group">
									<a className="absolute inset-0 z-10" href="#">
										<span className="sr-only">View product</span>
									</a>
									<img
										src="/placeholder.svg"
										alt="Product image"
										width={200}
										height={200}
										className="aspect-square rounded-md object-cover group-hover:opacity-80 transition-opacity"
									/>
									<div className="mt-2">
										<p className="font-medium">Elegant Leather Wallet</p>
										<p className="text-muted-foreground text-sm">$59.99</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6">
							<a className="text-primary" href="#">
								View all recently viewed
							</a>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Account Settings</h3>
						</div>
						<div className="p-6">
							<div className="grid gap-4">
								<div>
									<label
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor="name"
									>
										Name
									</label>
									<input
										className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										id="name"
										defaultValue="John Doe"
									/>
								</div>
								<div>
									<label
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										id="email"
										defaultValue="john@example.com"
									/>
								</div>
								<div>
									<label
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										htmlFor="password"
									>
										Password
									</label>
									<input
										className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										id="password"
										type="password"
									/>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6">
							<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
								Save Changes
							</button>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Payment Methods</h3>
						</div>
						<div className="p-6">
							<div className="grid gap-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-6 w-6 text-muted-foreground"
										>
											<rect width={20} height={14} x={2} y={5} rx={2} />
											<line x1={2} x2={22} y1={10} y2={10} />
										</svg>
										<div>
											<p className="font-medium">Visa - 1234</p>
											<p className="text-muted-foreground text-sm">Expires 12/24</p>
										</div>
									</div>
									<div className="flex gap-2">
										<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4"
											>
												<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
												<path d="M14 2v4a2 2 0 0 0 2 2h4" />
												<path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
											</svg>
											<span className="sr-only">Edit</span>
										</button>
										<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4"
											>
												<path d="M3 6h18" />
												<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
												<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
											</svg>
											<span className="sr-only">Delete</span>
										</button>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-6 w-6 text-muted-foreground"
										>
											<rect width={20} height={14} x={2} y={5} rx={2} />
											<line x1={2} x2={22} y1={10} y2={10} />
										</svg>
										<div>
											<p className="font-medium">Mastercard - 5678</p>
											<p className="text-muted-foreground text-sm">Expires 06/25</p>
										</div>
									</div>
									<div className="flex gap-2">
										<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4"
											>
												<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
												<path d="M14 2v4a2 2 0 0 0 2 2h4" />
												<path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
											</svg>
											<span className="sr-only">Edit</span>
										</button>
										<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4"
											>
												<path d="M3 6h18" />
												<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
												<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
											</svg>
											<span className="sr-only">Delete</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
