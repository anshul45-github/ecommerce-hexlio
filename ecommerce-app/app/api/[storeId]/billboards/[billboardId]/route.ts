import { billboard, store } from '@/models/model';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET (req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try { 
        const billboardId = (await params).billboardId;
        if(!billboardId) {
            return new NextResponse("Invalid billboard ID", { status: 400 });
        }

        const Billboard = await billboard.findOne({ id: billboardId });

        return NextResponse.json(Billboard, { status: 200 });
    }
    catch(error) {
        console.log("BILLBOARD_GET :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH (req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = await auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const body = await req.json();
        if(!body)
            return new NextResponse("Invalid data", { status: 400 });

        const { label, imageUrl } = body;

        if(!label || !imageUrl) {
            return new NextResponse("Invalid data", { status: 400 });
        }

        const storeId = (await params).storeId;
        if(!storeId) {
            return new NextResponse("Invalid store ID", { status: 400 });
        }

        const billboardId = (await params).billboardId;
        if(!billboardId) {
            return new NextResponse("Invalid billboard ID", { status: 400 });
        }

        const storeByUserId = await store.findOne({ id: storeId, userId });
        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const billboards = await billboard.find({ id: billboardId  });
        
        billboards.map(async (billboard) => {
            billboard.label = label;
            billboard.imageUrl = imageUrl;
            await billboard.save();
        });

        return NextResponse.json({ message: "Billboards updated" }, { status: 200 });
    }
    catch(error) {
        console.log("BILLBOARD_PATCH :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE (req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = await auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        
        const billboardId = (await params).billboardId;
        if(!billboardId) {
            return new NextResponse("Invalid billboard ID", { status: 400 });
        }

        const storeId = (await params).storeId;
        const storeByUserId = await store.findOne({ id: storeId, userId });
        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await billboard.deleteMany({ id: billboardId });

        return NextResponse.json({ message: "Billboards deleted" }, { status: 200 });
    }
    catch(error) {
        console.log("BILLBOARD_DELETE :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}