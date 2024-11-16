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
    console.log(params.storeId);
    const { userId } = await auth();
    if(!userId)
        redirect("/sign-in");
    const Store = await store.findOne({ id: params.storeId, userId });
    
    if(!Store)
        redirect("/");
    return (
        <div>
            <div>Nav</div>
            {children}
        </div>
    )
}