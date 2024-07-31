"use client";

import { useAuthStore } from "@/utils/stores/authStore";
import NProgress from "nprogress";

export default function Form({
	action,
	children,
	...props
}: Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "action"> & {
	action: (formData: FormData) => Promise<void>;
}) {
    const logout = useAuthStore((state) => state.logout);
	return (
		<form action={async function(frm) {
            logout();
			NProgress.start();
            await action(frm);
        }} {...props}>
			{children}
		</form>
	);
}
