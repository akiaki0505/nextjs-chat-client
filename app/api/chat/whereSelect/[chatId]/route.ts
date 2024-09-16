import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(req: Request, { params }: { params: { chatId: string } }){
    const chatId = Number(params.chatId);

    const allChatSelect = await prisma.chat.findMany({
        where: {
            room_id: chatId,
          },
        orderBy: {
            created_at: "asc" ,
          },
    });
    
    return NextResponse.json(allChatSelect);
};