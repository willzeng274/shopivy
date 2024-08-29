"use client";

import { Dialog } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";
import React from "react";

export default function ModalDialog({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    return (
        <Dialog defaultOpen onOpenChange={(e) => !e && router.back()}>
            {children}
        </Dialog>
    );
}