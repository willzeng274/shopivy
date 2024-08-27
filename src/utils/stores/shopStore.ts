import { Category } from '@prisma/client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ShopState {
    view: "grid" | "list";
    selectedCategory: Category | "All";
    priceRange: [number, number];
}

export interface ShopActions {
    toGrid(): void;
    toList(): void;
    setCategory(category: Category | "All"): void;
    setPriceRange(range: [number, number]): void;
}

export type ShopStore = ShopState & Readonly<ShopActions>;

export const useShopStore = create<ShopStore>()(
    devtools(
        persist(
            (set) => ({
                view: "grid",
                selectedCategory: "All",
                priceRange: [0, 10001] as [number, number],
                toGrid: () => set({ view: "grid" }),
                toList: () => set({ view: "list" }),
                setCategory: (category) => set({ selectedCategory: category }),
                setPriceRange: (range) => set({ priceRange: [Math.min(Math.max(range[0], 0), 10001), Math.min(Math.max(range[1], 0), 10001)] }),
            }),
            { name: 'shopStore' },
        )
    )
);