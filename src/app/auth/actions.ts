import { Prisma, type User } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { cookies } from "next/headers";
import { FormResponse } from "./_components/Form";
import { createTransport } from "nodemailer";
import { prisma } from "@/utils/state";

const saltRounds = 12;

const loginSchema = zfd.formData({
    email: zfd.text(z.string().email()),
    password: zfd.text()
});

const signupSchema = zfd.formData({
    name: zfd.text(),
    email: zfd.text(z.string().email()),
    password: zfd.text(),
});

const verifySchema = zfd.formData({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

const resetSchema = zfd.formData({
    password: zfd.text(),
    confirmPassword: zfd.text()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

const testEmails = ["hire.talent@uwaterloo.ca", "alumni@uwaterloo.ca"];

function email(to: string, subject: string, text: string) {
    const transporter = createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const toMail = testEmails.includes(to) ? process.env.EMAIL_USERNAME : to;

    console.log("sending to", toMail);

    const mailOptions = {
        from: "no-reply@shopivy.xyz",
        to: toMail,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
}

export function handlePasswordReset(userId: bigint) {
    return async function (_prevState: FormResponse, formData: FormData) {
        "use server";
        const schema = resetSchema.safeParse(formData);

        if (schema.error) {
            return {
                zod: true,
                errors: schema.error.flatten().fieldErrors,
            };
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(schema.data.password, salt);

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        });

        await prisma.recoverySession.deleteMany({
            where: {
                userId: userId
            }
        });

        return {
            reset: true
        };
    }
}

export function handleRecovery(origin: string) {
    return async function (_prevState: FormResponse, formData: FormData) {
        "use server";
        const schema = zfd.formData({
            email: zfd.text(z.string().email())
        }).safeParse(formData);

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
            };
        }

        const sess = await prisma.recoverySession.create({
            data: {
                userId: user.id
            },
            select: {
                id: true
            }
        });

        console.log(`URL: ${origin}/auth/recovery?recoverId=${sess.id}`);

        email(schema.data.email, "Reset your password", `${origin}/auth/recovery?recoverId=${sess.id}`);

        return {
            toast: "Reset password email sent successfully"
        };
    }
}

export async function handleVerify(_prevState: FormResponse, formData: FormData) {
    "use server";

    const schema = verifySchema.safeParse(formData);

    if (schema.error) {
        return {
            zod: true,
            errors: schema.error.flatten().fieldErrors,
        };
    }

    const cookieStore = cookies();

    const sess = cookieStore.get("ivysess");

    if (!sess) {
        return {
            errors: ["Invalid session"]
        };
    }

    const sessUser = await prisma.session.findUnique({
        where: {
            id: sess.value
        },
        select: {
            user: true
        }
    });

    if (!sessUser) {
        cookieStore.delete("ivysess");
        return {
            errors: ["Invalid session"]
        };
    }

    if (sessUser.user.code === null) {
        return {
            verified: true
        };
    }

    if (schema.data.pin !== sessUser.user.code) {
        return {
            errors: ["Incorrect pin"]
        };
    }

    await prisma.user.update({
        where: {
            id: sessUser.user.id
        },
        data: {
            code: null
        }
    });

    return {
        verified: true
    };
}

export async function resendEmail(_prevState: FormResponse, _formData: FormData) {
    "use server";

    console.log("RESENDING EMAIL");

    const cookieStore = cookies();

    const sess = cookieStore.get("ivysess");

    if (!sess) {
        return {
            errors: ["Invalid session"]
        };
    }

    const sessUser = await prisma.session.findUnique({
        where: {
            id: sess.value
        },
        select: {
            user: true
        }
    });

    if (!sessUser) {
        cookieStore.delete("ivysess");
        return {
            errors: ["Invalid session"]
        };
    }

    if (sessUser.user.code === null) {
        return {
            verified: true
        };
    }

    email(sessUser.user.email, "Please verify your email address for ShopIvy", "Your code is " + sessUser.user.code);

    return {
        toast: "Email resent successfully"
    };
}

export async function handleLogin(_prevState: FormResponse, formData: FormData) {
    "use server";

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
        };
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
            seller: user.seller,
            verified: user.code === null
            // not included: user.password, sess.id, sess.createdAt
            // reason: password shouldn't be exposed even as a hash
            // sess.id is stored in httpOnly cookie, why would we expose to frontend?
            // sess.createdAt has no use
        }
    };
}

export async function handleSignup(_prevState: FormResponse, formData: FormData) {
    "use server";
    const schema = signupSchema.safeParse(formData);

    if (schema.error) {
        return {
            errors: schema.error.flatten().fieldErrors,
        };
    }

    // idk why salt is separate
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(schema.data.password, salt);

    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const users = await prisma.$queryRaw<(User & { is_new: boolean })[]>(
        Prisma.sql`
            WITH ins AS (
                INSERT INTO public."User" (name, email, password, code)
                VALUES (${schema.data.name}, ${schema.data.email}, ${hashedPassword}, ${code})
                ON CONFLICT (email) DO NOTHING
                RETURNING *, TRUE AS is_new
            )
            SELECT * FROM ins
            UNION ALL
            SELECT *, FALSE AS is_new FROM public."User" WHERE email = ${schema.data.email} AND NOT EXISTS (SELECT * FROM ins);
        `
    );

    if (users.length !== 1) {
        return {
            errors: ["Database unexpected responded"],
        };
    }

    // console.log("users", users);

    if (!users[0].is_new && !await bcrypt.compare(schema.data.password, users[0].password)) {
        return {
            errors: ["Incorrect password"],
        };
    }

    console.log("NEW?", users[0].is_new);

    if (users[0].is_new) {
        email(users[0].email, "Please verify your email address for ShopIvy", "Your code is " + code);
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
            seller: users[0].seller,
            verified: users[0].code === null
        }
    };
}
