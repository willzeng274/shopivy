"use client";

import { usePopupStore } from "@/utils/stores/popupStore";
import { Dialog } from "@/components/ui/Dialog";

export default function DialogClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const isOpen = usePopupStore((state) => state.isOpen);
    const close = usePopupStore((state) => state.hide);
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            {children}
        </Dialog>
    )
}