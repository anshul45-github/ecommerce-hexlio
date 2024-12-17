import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { auth } from '@clerk/nextjs/server';
import toast from 'react-hot-toast';
import { billboard, store } from '@/models/model';

export async function POST(request: Request, {params} : {params: {storeId: string}}) {
    console.log("BILLBOARD_POST");
    
    const body = await request.json();
  
    if (!body || !body.label || !body.imageUrl) {
      toast.error("Invalid data");
      return new NextResponse("Invalid data", { status: 400 });
    }
    
    if(!params.storeId) {
        return new NextResponse("Invalid storeId", { status: 400 });
    }
  
    await connectToDB();
  
    try {    
        const { userId } = await auth();
        
        if(!userId) {
          return new NextResponse("Unauthenticated", { status: 401 });
        }

        const userByStoreId = await store.findOne({ id: params.storeId, userId });

        if(!userByStoreId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("Request body:", body);

        const id = uuidv4();
        const createdAt = new Date();
        
        const newBillboard = new billboard({ id, storeId: userByStoreId._id, label: body.label, imageUrl: body.imageUrl, createdAt, updatedAt: createdAt });

        await newBillboard.save();

        return NextResponse.json(newBillboard);
    }
    catch (error) {
        console.log("BILLBOARD_POST :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(request: Request, {params} : {params: {storeId: string}}) {
    console.log("BILLBOARD_GET");
    
    if(!params.storeId) {
        return new NextResponse("Invalid storeId", { status: 400 });
    }
  
    await connectToDB();
  
    try {    
        const Store = await store.findOne({ id: params.storeId });

        const billboards = await billboard.find({ storeId: Store._id });

        return NextResponse.json(billboards);
    }
    catch (error) {
        console.log("BILLBOARD_GET :", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}