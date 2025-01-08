import { create } from 'zustand';

interface PopupState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggle: () => void;
    show: () => void;
    hide: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    show: () => set({ isOpen: true }),
    hide: () => set({ isOpen: false }),
}));