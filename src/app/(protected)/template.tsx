import SaveUser from "./_components/SaveUser";
import { fetchUserFromSess } from "@/utils/state";

export default async function Template({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
    const user = await fetchUserFromSess();

    // simulate lag
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    
	return (
        <>
            <SaveUser user={{
                id: user.id,
                email: user.email,
                name: user.name,
                verified: user.code === null
            }} />
            {children}
        </>
    );
}
