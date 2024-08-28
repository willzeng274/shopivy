"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useCheckStore } from "../chkStore";

export default function SelectAll() {
    const allChecked = useCheckStore((state) => state.allChecked);
    const toggleAllCheck = useCheckStore((state) => state.toggleAllCheck);
	return (
		<div className="bg-white rounded-lg shadow p-4 flex items-center">
			<Checkbox
				id="check-all"
				checked={allChecked}
				onCheckedChange={toggleAllCheck}
				className="border-2 border-blue-500 text-blue-500 rounded-md focus:ring-blue-500"
			/>
			<label htmlFor="check-all" className="ml-2 text-sm font-medium text-gray-700">
				Select All Items
			</label>
		</div>
	);
}
