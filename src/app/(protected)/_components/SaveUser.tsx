"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import { User } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const SaveUser = React.memo(function Comp({ user }: { user: Omit<User, "password" | "code"> & { verified: boolean } }) {
	const login = useAuthStore((state) => state.login);
	login(user);
	
	const hasToasted = useRef<boolean>(false);

	useEffect(() => {
		if (!user.verified && !hasToasted.current) {
			hasToasted.current = true;
			toast.error("Note: Your account is not verified!\nStability will suffer.");
		}
	}, []);

	// this is used for command-based routing: Upcoming feature
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return <></>;
});

export default SaveUser;
