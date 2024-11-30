import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import {notFound, redirect} from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                user_id: session.id,
            },
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Welcome! {user?.username}!</h1>
            <form action={logOut}>
                <button className="bg-blue-400 rounded-full h-10 disabled:bg-gray-300">Log out</button>
            </form>
        </div>
    );
}