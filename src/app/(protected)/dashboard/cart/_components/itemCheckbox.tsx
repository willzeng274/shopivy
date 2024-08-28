"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useCheckStore, useItem } from "../chkStore";

export default function ItemCheckbox({ id }: { id: bigint }) {
    const toggleItemCheck = useCheckStore((state) => state.toggleItemCheck);
    const allChecked = useCheckStore((state) => state.allChecked);
    const checked = useItem(id);
	return (
		<Checkbox
			id={`check-${id}`}
			checked={checked}
            disabled={allChecked}
			onCheckedChange={() => toggleItemCheck(id)}
			className="border-2 border-blue-500 text-blue-500 rounded-md focus:ring-blue-500"
		/>
	);
}
