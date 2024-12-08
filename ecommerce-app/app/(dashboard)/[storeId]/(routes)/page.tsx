import store from "@/models/model";
import { auth } from "@clerk/nextjs/server";

interface DashboardLayoutProps {
    storeId: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children, params }) => {
    const { userId } = await auth();
    const { storeId } = await params;
    const Store = await store.findOne({ id: storeId, userId });
    return (
        <div>
            Active store: {Store && Store.name}
        </div>
    );
}

export default DashboardLayout;