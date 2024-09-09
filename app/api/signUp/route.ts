import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request){
    const { name, mailaddress, password } = await req.json();
    const user = await prisma.user.create({
        data: {
            name,
            mailaddress,
            password,
        },
    });
    return NextResponse.json(user);
};