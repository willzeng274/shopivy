import Header from "@/components/ui/Header";
import { permanentRedirect } from "next/navigation";
import Login from "./login";
import Signup from "./signup";
import { Toaster } from "react-hot-toast";

export default function Page({ params }: { params: { rt: string } }) {
	if (!["login", "signup"].includes(params.rt)) {
		return permanentRedirect("/auth/signup");
	}

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<main className="flex-1 flex">
				<Header />
				<section className="flex-1 flex items-center justify-center">
					<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black transition-[width] duration-1000 ease-in-out">
						{params.rt === "login" ? <Login /> : <Signup />}
					</div>
					<Toaster
						position="bottom-right"
					/>
				</section>
			</main>
		</div>
	);
}
