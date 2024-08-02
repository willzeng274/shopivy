import React from "react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Inter } from "next/font/google";
import { handleLogin } from "./actions";
import FormBtn from "./FormBtn";
import Form from "./Form";

const inter = Inter({
	weight: "400",
	display: "swap",
	subsets: ["latin"],
	preload: true,
});

export default async function Login() {
	return (
		<>
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome back!</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">Let's continue your 4.1 GPA streak 🔥</p>

			<Form className="mt-8 mb-4" action={handleLogin} autoComplete="off">
				<LabelInputContainer className="mb-4">
					<label htmlFor="email">Email Address</label>
					<Input id="email" name="email" placeholder="hire.talent@uwaterloo.ca" type="email" autoComplete="one-time-code" />
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<label htmlFor="password">Password</label>
					<Input id="password" name="password" placeholder="••••••••" type="password" autoComplete="new-password" />
				</LabelInputContainer>

				<FormBtn
					className="bg-gradient-to-br disabled:cursor-not-allowed disabled:opacity-50 relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8"
					type="submit"
				>
					Login &rarr;
					<BottomGradient />
				</FormBtn>

				<p className={cn("w-full text-center mt-4 text-sm", inter.className)}>
					Don't have an account?{" "}
					<Link href="/auth/signup" className="text-blue-500 hover:underline">
						Signup
					</Link>
				</p>

				<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

				<div className="flex flex-col space-y-4">
					<button
						disabled
						className="relative disabled:cursor-not-allowed disabled:opacity-50 flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						type="submit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-neutral-800 dark:text-neutral-300"
							viewBox="0 0 496 512"
						>
							<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
						</svg>
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
						<BottomGradient />
					</button>
					<button
						disabled
						className="relative disabled:cursor-not-allowed disabled:opacity-50 flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						type="submit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-neutral-800 dark:text-neutral-300"
							viewBox="0 0 16 16"
						>
							<path
								fill="#4285F4"
								d="M8.16 6.545v3.099h4.305a3.689 3.689 0 0 1-1.607 2.407l2.596 2.014c1.513-1.396 2.386-3.447 2.386-5.883 0-.567-.051-1.113-.146-1.636H8.16Z"
							/>
							<path
								fill="#34A853"
								d="m3.676 9.523-.585.448-2.073 1.614C2.334 14.197 5.032 16 8.16 16c2.16 0 3.97-.713 5.294-1.934l-2.596-2.015c-.713.48-1.622.77-2.698.77-2.08 0-3.848-1.403-4.48-3.294l-.004-.004Z"
							/>
							<path
								fill="#FBBC05"
								d="M1.018 4.415A7.901 7.901 0 0 0 .16 8c0 1.294.313 2.509.858 3.585 0 .008 2.662-2.065 2.662-2.065-.16-.48-.255-.99-.255-1.52 0-.531.095-1.04.255-1.52L1.018 4.415Z"
							/>
							<path
								fill="#EA4335"
								d="M8.16 3.185c1.178 0 2.225.408 3.062 1.193l2.29-2.29C12.123.792 10.32 0 8.16 0 5.033 0 2.334 1.796 1.018 4.415L3.68 6.48c.633-1.89 2.4-3.295 4.48-3.295Z"
							/>
						</svg>
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
						<BottomGradient />
					</button>
					{/* <button
						className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						type="submit"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-neutral-800 dark:text-neutral-300"
							viewBox="-20.62 0.53 820.42 555.49"
						>
							<path
								fill="#00aeef"
								d="M266.82.53c35 0 69.65 6.91 101.98 20.34s61.71 33.11 86.45 57.93c24.75 24.81 44.37 54.27 57.77 86.7a267.919 267.919 0 0 1 20.29 102.27c0 108.09-64.93 205.53-164.51 246.89s-214.2 18.5-290.41-57.93C2.18 380.3-20.62 265.36 20.62 165.5 61.87 65.64 159.04.53 266.82.53zm0 347.4c10.5.01 20.9-2.05 30.61-6.07s18.52-9.93 25.95-17.38 13.31-16.29 17.33-26.02a80.365 80.365 0 0 0 6.06-30.7c0-32.43-19.48-61.66-49.35-74.07s-64.26-5.55-87.12 17.38-29.7 57.41-17.33 87.37 41.53 49.49 73.86 49.49z"
							/>
							<path
								fill="#008ccf"
								d="M566.35 200.96c67.71 19.54 147.63 0 147.63 0-23.19 101.55-96.75 165.15-202.81 172.89a266.766 266.766 0 0 1-40.48 65.86 266.208 266.208 0 0 1-57.62 51.43c-21.6 14.24-45.15 25.25-69.92 32.68s-50.48 11.19-76.33 11.18l79.95-254.81C428.95 18.28 471.08.54 665.98.54H799.8c-22.38 98.88-99.54 174.41-233.44 200.42z"
							/>
						</svg>
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">OnlyFans</span>
						<BottomGradient />
					</button> */}
				</div>
			</Form>
		</>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
