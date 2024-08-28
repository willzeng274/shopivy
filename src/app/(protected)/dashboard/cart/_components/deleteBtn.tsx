"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import { deleteAction } from "../actions";
import { CartItemFormat } from "@/utils/state";
import { Button } from "@/components/ui/Button";
import { TrashIcon } from "lucide-react";

export default function DeleteButton({ item }: { item: CartItemFormat }) {
	const user = useAuthStore((state) => state.user);
	return (
		<form
			action={async function () {
				if (!user) return;
				await deleteAction(item.id);
                // tbh there probably isn't a better way to do this...
                document.getElementById(`cart-item-${item.itemId}`)?.remove();
			}}
		>
			<Button variant="ghost" size="sm" aria-label="Remove item" className="h-8 w-8 p-0">
				<TrashIcon className="h-4 w-4" />
			</Button>
		</form>
	);
}
