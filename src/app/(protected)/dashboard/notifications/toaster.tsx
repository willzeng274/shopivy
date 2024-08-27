"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Toaster() {
    const router = useRouter();
	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current === false) {
			toast.error("Notifications are not implemented yet.");
			router.push("/dashboard");
			effectRan.current = true;
		}
	}, []);

	return <></>;
}
