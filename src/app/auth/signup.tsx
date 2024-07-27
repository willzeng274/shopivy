import Header from "@/components/ui/Header";
import Link from "next/link";


export default async function Signup() {
    async function handleSignup(formData: FormData) {
        'use server';
        console.log(formData);
    }
	return (<>
        <p>Already have an account? <Link href="/auth/?isLogin">signup</Link></p>
        <form action={handleSignup}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" name="email" required />
            <label htmlFor="name">Display name</label>
            <input id="name" type="text" name="name" required />
            <label htmlFor="pw">Password</label>
            <input id="pw" type="password" name="password" required />
            <button type="submit">Submit</button>
        </form></>
	);
}