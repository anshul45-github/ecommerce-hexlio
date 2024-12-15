import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@clerk/nextjs/server';
import store from '@/models/model';
import toast from 'react-hot-toast';

export async function POST(request: Request) {
    console.log("STORE_POST");
    
    const body = await request.json();
  
    if (!body || !body.name) {
      toast.error("Invalid data");
      return new NextResponse("Invalid data", { status: 400 });
    }
  
    await connectToDB();
  
    try {
      console.log("Request body:", body);
    
      // Get the user ID from the session
      const { userId } = await auth();
      console.log("User ID:", userId);
      
      const id = uuidv4();
      const createdAt = new Date();
      const newStore = new store({ id, name: body.name, userId, createdAt, updatedAt: createdAt });
      await newStore.save();
      console.log("New store created :", newStore);
  
      return NextResponse.json(newStore);
    } catch (error) {
      console.log("STORE_POST :", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }