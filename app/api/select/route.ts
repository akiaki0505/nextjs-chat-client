import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(req: Request){
    const allRoomSelect = await prisma.room.findMany();
    return NextResponse.json(allRoomSelect);
};