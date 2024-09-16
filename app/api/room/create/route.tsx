import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request){
    const { room_name } = await req.json();
    const chatPost = await prisma.room.create({
        data: {
            room_name,
            public: true,
        },
    });
    return NextResponse.json(chatPost);
};