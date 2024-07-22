import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
    session: string | null;
}

export interface AuthActions {
    login: (sess: string) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                session: null,
                login: (sess) => set(() => ({ session: sess })),
                //   increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            { name: 'authStore' },
        )
    )
);