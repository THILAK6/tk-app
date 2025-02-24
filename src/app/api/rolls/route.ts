import { getAllConclusions } from "@/app/domain/conclusion";
import { getAllCustomers } from "@/app/domain/customer";
import { getAllInspectedTypes } from "@/app/domain/inspectedType";
import { getAllMachines } from "@/app/domain/machine";
import { createRoll, RollEntry } from "@/app/domain/roll";
import { getAllUsers } from "@/app/domain/user";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const customers = await getAllCustomers(prisma);
  const inspectedTypes = await getAllInspectedTypes(prisma);
  const machines = await getAllMachines(prisma);
  const conclusions = await getAllConclusions(prisma);
  const users = await getAllUsers(prisma);
  return NextResponse.json({
    customers,
    inspectedTypes,
    machines,
    conclusions,
    users,
  });
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
