"use client";

import { DialogClose } from "@/components/ui/Dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Close() {
	const router = useRouter();
	return (
		<DialogClose asChild>
			<button onClick={() => router.back()} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</button>
		</DialogClose>
	);
}
