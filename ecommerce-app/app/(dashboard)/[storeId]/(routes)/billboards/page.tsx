import { billboard, store } from "@/models/model";
import { BillboardClient } from "./components/billboard-client";

interface billboardsPageProps {
    params: {
        storeId: string;
    };
}

const settingsPage: React.FC<billboardsPageProps> = async ({ params } : {params : {storeId: string}}) => {
    const storeId = params.storeId;

    const Store = await store.findOne({ id: storeId });
    const billboards = await billboard.find({ storeId: Store._id }).sort({ createdAt: -1 });

    const formattedBillboards = billboards.map((billboard) => {
        return {
            id: billboard.id,
            label: billboard.label,
            createdAt: new Date(billboard.createdAt).toLocaleString(),
        };
    });

    return (
        <div>
            <BillboardClient data={formattedBillboards} />
        </div>
    );
}

export default settingsPage;