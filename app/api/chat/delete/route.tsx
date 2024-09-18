import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request){
    var { id } = await req.json();
    id = Number(id);

    const deleteChat = await prisma.chat.delete({
        where: {
            id: id,
          },
    });
    
    return NextResponse.json(deleteChat);
};