"use server";

import {z} from "zod";
import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/app/lib/session";
import {redirect} from "next/navigation";

const checkEmailExists = async (email:string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select:{
            user_id:true,
        }
    })

    return Boolean(user)
}

const formSchema = z.object({
    email : z.string().email().toLowerCase()
        .refine(checkEmailExists, "An account with this email does not exist."),
    password: z
        .string({
            required_error: "Password is required",
        })
})



export async function logInAction(prevState:any,formData:FormData){
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = await formSchema.safeParseAsync(data);


    if(!result.success) {
        return result.error.flatten();
    }
    else {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                user_id: true,
                password: true,
            },
        });

        const ok = await bcrypt.compare(
            result.data.password,
            user!.password ?? "xxxx"
        );

        if (ok) {
            const session = await getSession();
            session.id = user!.user_id;
            await session.save();
            redirect("/profile");
        } else {
            return {
                fieldErrors: {
                    password: ["Wrong password."],
                    email: [],
                },
            };
        }
    }
}