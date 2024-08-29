"use client";

import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
	const router = useRouter();
	const [query, setQuery] = useState("");

	const handleFormSubmit = () => {
		router.push(`/dashboard/shop?q=${encodeURIComponent(query)}`);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleFormSubmit();
		}
	};

	return (
		<form className="relative">
			<Input
				className="w-full"
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				name="search"
                autoComplete="one-time-code"
			/>
			<button
				type="submit"
				className="absolute right-4 top-1/2 -translate-y-1/2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlSpace="preserve"
					width={512}
					height={512}
					className="text-gray-600 h-4 w-4 fill-current"
					viewBox="0 0 56.966 56.966"
				>
					<path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" />
				</svg>
			</button>
		</form>
	);
}
