import { store } from "@/models/model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

interface settingsPageProps {
    params: {
        storeId: string;
    };
}

const settingsPage: React.FC<settingsPageProps> = async ({ params }) => {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }
    
    // fetch store from mongodb with given store ID
    const Store = await store.findOne({ userId, id: (await params).storeId });

    if(!Store) {
        redirect("/");
    }

    return (
        <div>
            <SettingsForm initialData={Store} />
        </div>
    );
}

export default settingsPage;