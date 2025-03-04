import { FaultWithoutMeta, createFault } from "@/app/domain/fault";
import { prismaClient } from "@/app/lib/dbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const prisma = prismaClient();
    const data = (await request.json()) as FaultWithoutMeta;
    const newFault = await createFault(prisma, data);
    return NextResponse.json(newFault);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
