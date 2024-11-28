"use server";

import {z} from "zod";

const formSchema = z.object({
    email : z.string().refine(
        (username) => username.includes("@zod.com"),
        "Only @zod.com emails are allowed"
    ),
    user: z.string().min(5, "Username should be at least 5 characters long."),
    password: z.string()
        .min(10, "Password should be at least 10 characters long.")
        .refine(
            (value) => /^(?=.*\d)$/.test(value),
            "Password should contain at least one number [0123456789]."
        )
})

export async function handleForm(prevState:any,formData:FormData){
    const data = {
        user: formData.get("user"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = formSchema.safeParse(data);

    if(!result.success) {
        return result.error.flatten();
    }

}