import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request){
    const {comment, room_id} = await req.json();
    const chatPost = await prisma.chat.create({
        data: {
            comment,
            room_id,
        },
    });
    return NextResponse.json(chatPost);
};