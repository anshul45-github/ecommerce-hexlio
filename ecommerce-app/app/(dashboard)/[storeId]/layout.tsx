import Navbar from "@/components/navbar";
import store from "@/models/model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard ({
    children, params
}: {
    children: React.ReactNode;
    params: {
        storeId: string;
    };
}) {
    const { storeId } = await params;
    const { userId } = await auth();
    if(!userId)
        redirect("/sign-in");
    const Store = await store.findOne({ id: storeId, userId });
    
    if(!Store)
        redirect("/");
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}