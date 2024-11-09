// import { NextResponse } from "next/server";
// import mongoose from 'mongoose';
// import { connectToDB } from "@/lib/mongoose";
// import { auth } from "@clerk/nextjs/server";
// import store from "@/models/model";
// import { v4 as uuidv4 } from 'uuid';
// Z
// export async function POST(request: Request) {
//     console.log("STORE_POST");
    
//     const body = await request.json();
//     console.log(body);
    
//     try {
//         const { userId, redirectToSignIn } = await auth();
//         if(!userId) {
//             return new NextResponse("Unauthorized", {status: 401})
//         }
//         const { name } = body;
//         if(!name) {
//             return new NextResponse("Unauthorized", {status: 401})
//         }
//         await connectToDB();
//         const id = uuidv4();
//         const createdAt = new Date();
//         const updatedAt = new Date();

//         const newStore = new store({ id, name, userId, createdAt, updatedAt });
//         const savedStore = await newStore.save();

//         // Return the saved document as JSON
//         return NextResponse.json(savedStore, { status: 201, headers: { 'Content-Type': 'application/json' } });
//         // return new NextResponse("Store created", {status: 201})
//     }
//     catch(error) {
//         console.log("STORE_POST", error);
//         return new NextResponse("Interal error", {status: 500})
//     }
// }.

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@clerk/nextjs/server';
import store from '@/models/model';

// export async function POST(request: Request) {
//   const body = await request.json();
// //   const discussion = body.discussion ;
// //   const description = body.description ;
// //   const image = body.image ;
// //   const userId = body.userId ;
//   const name = body.name ;
// //   const id = body.id ;
// //   const link = body.link ;
// //   const shares = body.shares ;
// //   const likes = body.likes ;
// //   const communityRandomID = body.communityRandomID ;
//     const { userId } = await auth();
//     const id=uuidv4();

//   if (!userId || !name) {
//     console.error("Invalid data");
//     return new NextResponse("Invalid data", { status: 400 });
//   }

//   await connectToDB();

//   try {

//     const Store = new store({
//       userId, name, id, createdAt: new Date(), updatedAt: new Date()
//     });

//     await Store.save();
//     console.log("New Store saved:");

//     return NextResponse.json(Store, { status: 201 });
//   } catch (error) {
//     console.error("Error saving store:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

export async function POST(request: Request) {
    console.log("STORE_POST");
    
    const body = await request.json();
  
    if (!body || !body.name) {
      console.error("Invalid data");
      return new NextResponse("Invalid data", { status: 400 });
    }
  
    await connectToDB();
  
    try {
      console.log("Request body:", body);
  
      // Check if a question with the same question text already exists
  
      // Insert the new question
      const { userId } = await auth();
      console.log("User ID:", userId);
      
      const id = uuidv4();
        const createdAt = new Date();
      const newStore = new store({ id, name: body.name, userId, createdAt, updatedAt: createdAt });
      console.log("New question saved:", newStore);
      await newStore.save();
      console.log("New question saved:", newStore);
  
      return NextResponse.json(newStore);
    } catch (error) {
      console.log("Error processing request:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }