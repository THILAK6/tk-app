import { CurrentRoll, setCurrentRoll } from "@/app/domain/roll";
import { prismaClient } from "@/app/lib/dbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const prisma = prismaClient();
    const currentRollFromRequest = (await request.json()) as CurrentRoll;
    setCurrentRoll(prisma, currentRollFromRequest.currentRollId);
    return NextResponse.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
