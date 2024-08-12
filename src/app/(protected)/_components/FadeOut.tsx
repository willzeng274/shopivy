"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export default function FadeOut({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div
			className={cn("absolute w-full h-full [transition:visibility_0s_1s,opacity_1s_ease-in-out] z-[999999999]", {
				"invisible opacity-0": mounted,
			})}
		>
			{children}
		</div>
	);
}
