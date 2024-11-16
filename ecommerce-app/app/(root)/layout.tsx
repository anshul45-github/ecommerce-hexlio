import { connectToDB } from "@/lib/mongoose";
import store from "@/models/model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';

export default async function mainLayout({
    children
}: {
    children: React.ReactNode;
}) {
    await connectToDB();
    const { userId }= await auth();
    if(!userId)
        redirect("/sign-in");
    const Store = await store.findOne({ userId });
    if(Store) {
        redirect(`/${Store.id}`);
    }
    return (
        <div>
            {children}
        </div>
    )
}