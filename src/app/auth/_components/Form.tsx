"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import * as NProgress from "nprogress";
import { FormCtx } from "./frmCtx";

export interface FormResponse {
    zod?: boolean;
	errors?: unknown;
	data?: Omit<User, 'password' | 'code'> & { verified: boolean };
	verified?: boolean;
	toast?: string;
	reset?: boolean;
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
	const [submitted, setSubmitted] = useState<boolean>(false);
	const login = useAuthStore((state) => state.login);
	const verify = useAuthStore((state) => state.verify);
	const router = useRouter();

	useEffect(() => {
		if (!state) return;
        if (state.errors) {
            // console.log("new message", state.errors);
            if (state.zod) {
				NProgress.done();
                return Object.entries(state.errors).forEach(([k, v]) => toast.error(`${k} field error: ${v}`));
            }
			if (String(state.errors)) toast.error(String(state.errors));
			NProgress.done();
        }
		if (state.data) {
			login(state.data);
			router.push('/dashboard');
		}
		if (state.verified) {
			verify();
			router.push('/dashboard');
		}
		if (state.toast) {
			toast.success(state.toast);
			NProgress.done();
		}
		if (state.reset) {
			toast.success("Password reset successfully");
			router.push('/auth/login');
		}
	}, [state]);

	return (
		<FormCtx.Provider value={submitted}>
			<form action={async function(formData: FormData) {
				NProgress.start();
				setSubmitted(true);
				formAction(formData);
			}} {...props}>
				{children}
			</form>
		</FormCtx.Provider>
	);
}
