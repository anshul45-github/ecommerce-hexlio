import { BillboardClient } from "./components/billboard-client";

interface billboardsPageProps {
    params: {
        storeId: string;
    };
}

const settingsPage: React.FC<billboardsPageProps> = async ({ params }) => {
    return (
        <div>
            <BillboardClient />
        </div>
    );
}

export default settingsPage;