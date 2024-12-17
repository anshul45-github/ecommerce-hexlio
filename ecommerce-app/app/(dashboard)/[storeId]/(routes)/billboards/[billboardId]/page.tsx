import { billboard } from "@/models/model";
import BillboardForm from "../components/billboard-form";

const billboardsIdPage = async ({ params } : { params: { billboardId: string; } }) => {
    const Billboard = await billboard.findOne({ id: (await params).billboardId });

    return (
        <div>
            <BillboardForm initialData={Billboard} />
        </div>
    );
}

export default billboardsIdPage;