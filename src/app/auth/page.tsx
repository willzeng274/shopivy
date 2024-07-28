import { motion } from "framer-motion";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import Header from "@/components/ui/Header";
import Client from "./client";

type PageProps = {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
	const isLogin = searchParams["isLogin"] !== undefined;

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<main className="flex-1">
				<Header />
				<section>
					{/* /thi */}
					<Client>{isLogin ? <Login /> : <Signup />}</Client>
				</section>
			</main>
		</div>
	);
}
