import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(req: Request){
    const allChatSelect = await prisma.chat.findMany();
    return NextResponse.json(allChatSelect);
};