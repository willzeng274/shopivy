import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import SaveUser from "./SaveUser";

const prisma = new PrismaClient();

export default async function Template({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

    const cookieStore = cookies();

    // because of middleware, this cannot be null
    const sess = cookieStore.get("ivysess")!;

    const sessionUser = await prisma.session.findUnique({
        where: {
            id: sess.value
        },
        select: {
            user: true
        }
    });

    if (!sessionUser) {
        await prisma.session.delete({
            where: {
                id: sess.value
            }
        });
        
        cookieStore.delete("ivysess");

        return permanentRedirect("/auth/login");
    }

    // simulate lag
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
	return (
        <>
            <SaveUser user={{
                id: sessionUser.user.id,
                email: sessionUser.user.email,
                name: sessionUser.user.name
            }} />
            {children}
        </>
    );
}
