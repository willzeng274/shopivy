"use client";

import { useAuthStore } from "@/utils/stores/authStore";

interface StoreInitializerProps {
    session: string | null,
    children: React.ReactNode
}

export default function StoreInitializer({ session, children }: StoreInitializerProps) {
	useAuthStore.setState({
		session,
	});
    
	return children;
}
