"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import * as NProgress from "nprogress";

export interface FormResponse {
	zod?: boolean;
	errors?: unknown;
	redirect?: string;
	toast?: string;
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
	const router = useRouter();

	useEffect(() => {
		if (!state) return;
		if (state.errors) {
			if (state.zod) {
				NProgress.done();
				return Object.entries(state.errors).forEach(([k, v]) => toast.error(`${k} field error: ${v}`));
			}
			if (String(state.errors)) toast.error(String(state.errors));
			NProgress.done();
		}
		if (state.redirect) {
			router.push(state.redirect);
		}
		if (state.toast) {
			toast.success(state.toast);
			NProgress.done();
		}
	}, [state]);

	return (
		<form
			action={async function (formData: FormData) {
				NProgress.start();
				formAction(formData);
			}}
			{...props}
		>
			{children}
		</form>
	);
}
