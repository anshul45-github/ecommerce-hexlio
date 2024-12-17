import { store } from '@/models/model';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import toast from 'react-hot-toast';

export async function PATCH (req: Request, { params } : { storeId: string }) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name } = body;
        if(!userId) {
            toast.error("Unauthorized");
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!name) {
            toast.error("Invalid data");
            return new NextResponse("Invalid data", { status: 400 });
        }
        const storeId = (await params).storeId;
        if(!storeId) {
            toast.error("Invalid store ID");
            return new NextResponse("Invalid store ID", { status: 400 });
        }
        const Store = await store.findOne({ id: storeId, userId });
        Store.name = name;
        await Store.save();
        
        return NextResponse.json({ message: "Store updated" }, { status: 200 });
    }
    catch(error) {
        console.log("STORE_PATCH :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE (req: Request, { params } : { storeId: string }) {
    try {
        const { userId } = await auth();
        if(!userId) {
            toast.error("Unauthorized");
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const storeId = params.storeId;
        if(!storeId) {
            toast.error("Invalid store ID");
            return new NextResponse("Invalid store ID", { status: 400 });
        }
        await store.deleteOne({ id: storeId, userId });
        return NextResponse.json({ message: "Store deleted" }, { status: 200 });
    }
    catch(error) {
        console.log("STORE_DELETE :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}