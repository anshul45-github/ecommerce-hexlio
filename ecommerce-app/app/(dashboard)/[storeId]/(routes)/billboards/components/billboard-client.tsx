"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <div className="flex justify-between space-y-4 p-8 bg-white">
            <Heading title="Billboards" description="Manage billboards for your store" />
            <Button variant="default" size="sm" onClick={() => {router.push(`/${params.storeId}/billboards/new`)}} >
                <Plus className="w-4 h-4" />
                Add new
            </Button>
        </div>
    )
};