import Header from "@/components/ui/Header";
// import { headers } from "next/headers";
// import { permanentRedirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
    // const headerList = headers();
	// if (!["/auth/login", "/auth/signup", "/auth/verify", "/auth/recovery"].includes(headerList.get("x-current-path")!)) {
	// 	return permanentRedirect("/auth/signup");
	// }

	return (
		<div className="flex flex-col min-h-[100dvh] bg-gray-500">
			<main className="flex-1 flex">
				<Header />
				<section className="flex-1 flex items-center justify-center">
					<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black transition-[width] duration-1000 ease-in-out">
						{children}
					</div>
					<Toaster
						position="bottom-right"
					/>
				</section>
			</main>
		</div>
	);
}
