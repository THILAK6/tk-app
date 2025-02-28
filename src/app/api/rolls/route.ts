import { createRoll, getRollsToShow, RollEntry } from "@/app/domain/roll";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const rolls = await getRollsToShow(prisma);
    return NextResponse.json(rolls);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}

export async function POST(request: Request) {
  try {
    const prisma = new PrismaClient();
    const data = (await request.json()) as RollEntry;
    const newRoll = await createRoll(data, prisma);
    return NextResponse.json(newRoll);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
