"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import { User } from "@prisma/client";
import React, { useEffect } from "react";

const SaveUser = React.memo(function Comp({ user }: { user: Omit<User, "password" | "code"> & { verified: boolean } }) {
	const login = useAuthStore((state) => state.login);
	login(user);

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
