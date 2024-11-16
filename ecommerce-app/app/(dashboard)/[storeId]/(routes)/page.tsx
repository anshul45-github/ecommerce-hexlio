import store from "@/models/model";
import { auth } from "@clerk/nextjs/server";

interface DashboardLayoutProps {
    storeId: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children, params }) => {
    const { userId } = await auth();
    const Store = await store.findOne({ id: params.storeId, userId });
    return (
        <div>
            Active store: {Store && Store.name}
        </div>
    );
}

export default DashboardLayout;