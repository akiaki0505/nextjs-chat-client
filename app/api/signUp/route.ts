import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import bcrypt from 'bcryptjs';

export async function POST(req: Request){
    const { name, mailaddress, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            mailaddress,
            password: hashedPassword,
        },
    });
    return NextResponse.json(user);
};