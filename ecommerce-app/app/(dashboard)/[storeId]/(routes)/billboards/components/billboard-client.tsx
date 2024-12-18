"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { ApiList } from "@/components/api-list";

interface BillboardClientProps {
    data: any;
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between bg-white space-y-4 p-8">
                <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
                <Button variant="default" size="sm" onClick={() => {router.push(`/${params.storeId}/billboards/new`)}} >
                    <Plus className="w-4 h-4" />
                    Add new
                </Button>
            </div>
            <Separator />
            <div className="p-4">
                <DataTable placeholder="Search Billboards" searchKey="label" columns={columns} data={data} />
            </div>
            <Separator />
            <div className="p-4">
                <ApiList entityName="billboards" entityIdName="billboardId" />
            </div>
        </div>
    )
};