import { createContext, useContext } from "react";
import { UserClient } from "./authStore";

export const UserCtx = createContext<Readonly<UserClient>>({
    id: BigInt(0),
    name: "",
    email: "",
    seller: false,
    verified: false
});

export function useUser() {
    const user = useContext(UserCtx);
    return user;
}