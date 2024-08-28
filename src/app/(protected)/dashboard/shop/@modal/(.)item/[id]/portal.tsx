"use client";

import { DialogPortal } from "@/components/ui/Dialog";

export default function Portal({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <DialogPortal
            container={document.getElementById("modal-root")}
        >
            {children}
        </DialogPortal>
    )
}