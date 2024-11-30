"use server";

import {z} from "zod";
import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/app/lib/session";
import {redirect} from "next/navigation";

const formSchema = z.object({
    email : z.string().refine(
        (username) => username.includes("@zod.com"),
        "Only @zod.com emails are allowed"
    ),
    username: z.string().min(5, "Username should be at least 5 characters long."),
    password: z.string()
        .min(10, "Password should be at least 10 characters long.")
})
    .superRefine(async ({ username }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                username,
            },
            select: {
                user_id: true,
            }
        })
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This username is already taken",
                path: ["username"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                user_id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This email is already taken",
                path: ["email"],
                fatal: true,
            });
            return z.NEVER;
        }
    })

export async function handleForm(prevState:any,formData:FormData){
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = await formSchema.safeParseAsync(data);


    if(!result.success) {
        return result.error.flatten();
    }
    else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                user_id: true,
            },
        });

        const session = await getSession();

        session.id = user.user_id
        await session.save();

        redirect("/profile");
    }
}