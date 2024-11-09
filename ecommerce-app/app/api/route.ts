import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { connectToDB } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        const id = uuid();
    }
    catch(error) {
        console.log("STORE_POST", error);
        return new NextResponse("Interal error", {status: 500})
    }
}