import Header from "@/components/ui/Header";
import { cookies } from "next/headers";
import Test from "./test";
import Link from "next/link";


export default async function Login() {
	async function testSession() {
		'use server';
		const cookieStore = cookies();
		cookieStore.set({
			name: "session",
			value: "guest",
			httpOnly: true,
			path: "/",
            sameSite: "lax"
		});
	}
	async function removeTestSession() {
		'use server';
		const cookieStore = cookies();
		cookieStore.delete("session");
	}
    async function handleLogin() {
        'use server';
    }
	return (<>
		<p>Don't have an account? <Link href="/auth/">signup</Link></p>
		<form action={handleLogin}>
			<label htmlFor="email">Email</label>
			<input id="email" type="text" name="email" required />
			<label htmlFor="pw">Password</label>
			<input id="pw" type="password" name="password" required />
			<button type="submit">Submit</button>
			</form>
		<Test testSession={testSession} removeTestSession={removeTestSession} /></>
	);
}
