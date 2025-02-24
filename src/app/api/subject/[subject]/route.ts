import { isSubject, writeData } from "@/app/domain/subject";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ subject: string }> }) {
    const subject = (await params).subject;
    if(!isSubject(subject))
    {
        return NextResponse.json({error: "Invalid subject"});
    }
    const primsa = new PrismaClient();
    const data = (await request.json()).data;
    console.log(data);
    await writeData[subject](primsa, data);
    return NextResponse.json({
        message: "Success",
    });
}