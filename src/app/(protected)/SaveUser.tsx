'use client';

import { useAuthStore } from "@/utils/stores/authStore";
import { User } from "@prisma/client";
import React from "react";

const SaveUser = React.memo(function Comp({ user }: { user: Omit<User, 'password'> }) {
    const login = useAuthStore((state) => state.login);
    login(user);
    return (
        <></>
    );
});

export default SaveUser;