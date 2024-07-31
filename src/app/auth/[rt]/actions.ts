'use server';

import { Prisma, PrismaClient, type User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { cookies } from "next/headers";
import { FormResponse } from "./Form";

const saltRounds = 12;

const prisma = new PrismaClient();

const loginSchema = zfd.formData({
    email: zfd.text(z.string().email()),
    password: zfd.text()
});

const signupSchema = zfd.formData({
    name: zfd.text(),
    email: zfd.text(z.string().email()),
    password: zfd.text(),
});

export async function handleLogin(_prevState: FormResponse, formData: FormData) {
    const schema = loginSchema.safeParse(formData);

    if (schema.error) {
        return {
            zod: true,
            errors: schema.error.flatten().fieldErrors,
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: schema.data.email
        }
    });

    if (!user) {
        return {
            errors: ["User not found"],
        }
    }

    if (!await bcrypt.compare(schema.data.password, user.password)) {
        return {
            errors: ["Incorrect password"],
        };
    }

    const sess = await prisma.session.create({
        data: {
            userId: user.id,
        }
    });

    const cookieStore = cookies();

    cookieStore.set("ivysess", sess.id);

    return {
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            // not included: user.password, sess.id, sess.createdAt
            // reason: password shouldn't be exposed even as a hash
            // sess.id is stored in httpOnly cookie, why would we expose to frontend?
            // sess.createdAt has no use
        }
    };
}

export async function handleSignup(_prevState: FormResponse, formData: FormData) {
    const schema = signupSchema.safeParse(formData);

    if (schema.error) {
        return {
            errors: schema.error.flatten().fieldErrors,
        };
    }

    // idk why salt is separate
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(schema.data.password, salt);

    const users = await prisma.$queryRaw<User[]>(
        Prisma.sql`
            WITH ins AS (
                INSERT INTO public."User" (name, email, password)
                VALUES (${schema.data.name}, ${schema.data.email}, ${hashedPassword})
                ON CONFLICT (email) DO NOTHING
                RETURNING *
            )
            SELECT * FROM ins
            UNION ALL
            SELECT * FROM public."User" WHERE email = ${schema.data.email} AND NOT EXISTS (SELECT * FROM ins);
        `
    );

    if (users.length !== 1) {
        return {
            errors: ["Database unexpected responded"],
        };
    }

    // console.log("users", users);

    if (!await bcrypt.compare(schema.data.password, users[0].password)) {
        return {
            errors: ["Incorrect password"],
        };
    }

    const sess = await prisma.session.create({
        data: {
            user: {
                connect: {
                    id: users[0].id
                }
            }
        },
    });

    const cookieStore = cookies();

    cookieStore.set("ivysess", sess.id);

    return {
        data: {
            id: users[0].id,
            email: users[0].email,
            name: users[0].name,
        }
    };
}
