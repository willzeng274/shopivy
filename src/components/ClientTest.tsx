'use client';

import { useAuthStore } from "@/utils/stores/authStore";

export default function ClientTest() {
    const state = useAuthStore((state) => state);
    console.log(state);
    return (
        <>
            {JSON.stringify(state, (k, v) => {
                if (typeof v === 'bigint') {
                    return v.toString() + 'n';
                }
                return v;
            })}
        </>
    );
}