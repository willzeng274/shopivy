import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface QuantState {
	item: {
        [id: string]: number;
    }
}

export interface QuantActions {
	setItemQuant: (id: string, quant: number) => void;
}

export type QuantStore = QuantState & Readonly<QuantActions>;

export const useQuantStore = create<QuantStore>()(
	devtools((set) => ({
		item: {},
		setItemQuant: (id: string, quant: number) => set((state) => ({ ...state, item: { ...state.item, [id]: quant } })),
	}))
);

export function useQuantItem(id: bigint, initial: number): number {
    const item = useQuantStore((state) => state.item);
    return item[id.toString()] ?? initial;
}

export function useQuantEdit(id: bigint) {
    return useQuantStore((state) => state.setItemQuant.bind(null, id.toString()));
}

