"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export interface FormResponse {
    zod?: boolean;
	errors?: unknown;
	data?: Omit<User, 'password'>;
}

const initialState = {
	errors: [],
};

export default function Form({
	action,
	children,
	...props
}: Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "action"> & {
	action: (prev: FormResponse, formData: FormData) => Promise<FormResponse>;
}) {
	const [state, formAction] = useFormState(action, initialState);
	const login = useAuthStore((state) => state.login);

	useEffect(() => {
        if (state && state.errors) {
            // console.log("new message", state.errors);
            if (state.zod) {
                return Object.entries(state.errors).forEach(([k, v]) => toast.error(`${k} field error: ${v}`));
            }
            toast.error(String(state.errors));
        }
		if (state && state.data) {
			login(state.data);
		}
	}, [state]);

	return (
		<form action={formAction} {...props}>
			{children}
		</form>
	);
}
