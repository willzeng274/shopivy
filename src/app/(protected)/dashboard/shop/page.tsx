import Link from "next/link";
import React from "react";

export default function Page() {
    return (
        <div>
            <p>Shopping page is still under construction</p>
            <Link href="/dashboard" className="text-blue-500 hover:underline">Go to dashboard</Link>
        </div>
    );
}