import { PrismaClient } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

const prisma = new PrismaClient();

// MUST be called on the server.
// Only called once throughout the app's lifetime
export const fetchUserFromSess = cache(async () => {
    console.log("FETCHING USER FROM SESSION...");
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

    return sessionUser.user;
});