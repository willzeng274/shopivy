import { User } from "@prisma/client";

interface State {
    key2: number;
    user: User;
}

type Keys = keyof State;

// note: this only works without fast refresh, meaning stability will suffer in dev mode
const serverState = new Map<Keys, State[Keys]>();

export function setServerState<K extends Keys>(key: K, value: State[K]) {
    serverState.set(key, value);
}

export function getServerState<K extends Keys>(key: K): State[K] | undefined {
    return serverState.get(key) as State[K] | undefined;
}

export function deleteServerState<K extends Keys>(key: K) {
    serverState.delete(key);
}