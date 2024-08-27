import { Input } from "@/components/ui/Input";
import Form from "../_components/Form";
import { handlePasswordReset, handleRecovery } from "../actions";
import { PrismaClient } from "@prisma/client";
import { permanentRedirect } from "next/navigation";
import FormBtn from "../_components/FormBtn";
import { cn } from "@/utils/cn";
import { headers } from "next/headers";

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

export default async function Recovery({ searchParams }: { searchParams: { recoverId?: string } }) {
    const headerList = headers();
    const origin = headerList.get("x-current-origin")!;

	if (!searchParams.recoverId) {
		return (
			<>
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Forgot your password?</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Enter the email associated with your account to reset your password..
				</p>
				<Form className="mt-8 mb-4" action={handleRecovery(origin)} autoComplete="off">
					<LabelInputContainer className="mb-4">
						<label htmlFor="email">Email</label>
						<Input id="email" name="email" placeholder="hire.talent@uwaterloo.ca" type="email" autoComplete="one-time-code" />
					</LabelInputContainer>
					<FormBtn
						className="bg-gradient-to-br disabled:cursor-not-allowed disabled:opacity-50 relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8"
						type="submit"
					>
						Submit
					</FormBtn>
				</Form>
			</>
		);
	}

	const sess = await prisma.recoverySession.findUnique({
		where: {
			id: String(searchParams.recoverId),
		},
		select: {
			user: true,
		},
	});

	if (!sess) return <p className="w-full flex items-center justify-center">Error: invalid session</p>;

	return (
		<>
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Reset your password</h2>
			<Form className="mt-8 mb-4" action={handlePasswordReset(sess.user.id)} autoComplete="off">
				<LabelInputContainer className="mb-4">
					<label htmlFor="password">New Password</label>
					<Input id="password" name="password" placeholder="••••••••" type="password" autoComplete="new-password" />
				</LabelInputContainer>
				<LabelInputContainer className="mb-1">
					<label htmlFor="confirm">Confirm Password</label>
					<Input id="confirm" name="confirmPassword" placeholder="••••••••" type="password" autoComplete="new-password" />
				</LabelInputContainer>

				<FormBtn
					className="bg-gradient-to-br disabled:cursor-not-allowed disabled:opacity-50 relative from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-8"
					type="submit"
				>
					Submit
				</FormBtn>
			</Form>
		</>
	);
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
