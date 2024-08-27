'use client';

import { useAuthStore } from "@/utils/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    console.log("user", user);

    useEffect(() => {
        if (user?.verified) router.push("/dashboard");
    }, [user]);

    return <></>
}