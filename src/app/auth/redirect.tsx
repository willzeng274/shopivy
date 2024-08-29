'use client';

import { useUser } from "@/utils/stores/userCtx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
    const user = useUser();
    const router = useRouter();

    console.log("user", user);

    useEffect(() => {
        if (user.verified) router.push("/dashboard");
    }, [user]);

    return <></>
}