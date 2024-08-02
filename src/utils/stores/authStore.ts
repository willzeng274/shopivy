import { User } from '@prisma/client';
import { create } from 'zustand';
import { devtools, persist, PersistStorage } from 'zustand/middleware';

type UserClient = Omit<User, 'password' | 'code'> & { verified: boolean };

export interface AuthState {
    user: UserClient | null;
}

export interface AuthActions {
    login: (user: UserClient) => void;
    logout: () => void;
    verify: () => void;
}

export type AuthStore = AuthState & Readonly<AuthActions>;

const customJSONStorage: PersistStorage<AuthStore> = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return JSON.parse(str, (_k, v) => {
            if (v && typeof v === 'object' && v.hasOwnProperty('_bigint_')) {
                return BigInt(v['_bigint_']);
            }
            return v;
        });
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value, (_k, v) => {
            if (typeof v === 'bigint') {
                return {
                    '_bigint_': v.toString()
                };
            }
            return v;
        }));
    },
    removeItem: (name) => localStorage.removeItem(name),
};

const dummyStorage: PersistStorage<AuthStore> = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { }
};

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                login: (user) => set(() => ({ user })),
                logout: () => set(() => ({ user: null })),
                verify: () => set((state) => ({
                    user: state.user === null ? null : {
                        ...state.user,
                        verified: true
                    }
                })),
            }),
            { name: 'authStore', storage: typeof localStorage !== 'undefined' ? customJSONStorage : dummyStorage },
        )
    )
);