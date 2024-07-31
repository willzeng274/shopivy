import Link from "next/link";

export default function Page() {
    return (
        <div>
            <p>Shopping page is still under construction</p>
            <Link href="/profile" className="text-blue-500 hover:underline">Go to profile</Link>
        </div>
    );
}