import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface CheckState {
	cartChecked: {
        [id: string]: boolean | undefined
    };
	allChecked: boolean;
}

export interface CheckActions {
	toggleItemCheck: (id: bigint) => void;
	toggleAllCheck: () => void;
}

export type CheckStore = CheckState & Readonly<CheckActions>;

export const useCheckStore = create<CheckStore>()(
	devtools((set) => ({
		cartChecked: {},
		allChecked: false,
		toggleItemCheck: (id) =>
			set(({ cartChecked }) => ({
				cartChecked: {...cartChecked, [id.toString()]: !cartChecked[id.toString()]},
			})),
		toggleAllCheck: () => set(({ allChecked }) => ({ allChecked: !allChecked })),
	}))
);

export function useItem(id: bigint): boolean | undefined {
    const cartChecked = useCheckStore((state) => state.cartChecked);
    return cartChecked[id.toString()];
}
