import { PrismaClient } from "@prisma/client";

export type Roll = {
  id: string;
  siNo: string;
  inspectedBy1: string;
  inspectedBy2: string;
  inspectedTypeId: string;
  inspectedQnty: number;
  rollNo: string;
  inspectionMachineId: string;
  shift: string;
  skipNo: string;
  prdn: string;
  startTime: Date;
  endTime: Date;
  packedBy1: string;
  packedBy2: string;
  note: string | null;
  customerId: string;
  conclusionId: string;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type RollEntry = {
  siNo: string;
  inspectedBy1: string;
  inspectedBy2: string;
  inspectedTypeId: string;
  inspectedQnty: number;
  rollNo: string;
  inspectionMachineId: string;
  shift: string;
  skipNo: string;
  prdn: string;
  startTime: Date;
  endTime: Date;
  packedBy1: string;
  packedBy2: string;
  note?: string;
  customerId: string;
  conclusionId: string;
  remarks?: string;
};

export type RollToShow = {
  id: string;
  rollNo: string;
  inspectedBy1: string;
  startTime: Date;
  customerName: string;
  conclusionName: string;
  machineName: string;
};

export type CurrentRoll = {
  currentRollId: string;
};

export const getRoll = async (
  prisma: PrismaClient,
  rollId: string
): Promise<Roll | null> => {
  return await prisma.roll.findFirst({
    where: {
      id: rollId,
    },
  });
};

const clearCurrentRoll = async (prisma: PrismaClient) => {
  await prisma.currentRoll.deleteMany();
};

export const getCurrentRoll = async (
  prisma: PrismaClient
): Promise<Roll | null> => {
  const currentRollId = await prisma.currentRoll.findFirst();
  return getRoll(prisma, currentRollId?.rollId ?? "");
};

export const setCurrentRoll = async (prisma: PrismaClient, rollId: string) => {
  await clearCurrentRoll(prisma);
  await prisma.currentRoll.create({
    data: { rollId },
  });
};

export const createRoll = async (
  rollEntry: RollEntry,
  prisma: PrismaClient
) => {
  return await prisma.roll.create({
    data: rollEntry,
  });
};

export const getRollsToShow = async (
  prisma: PrismaClient
): Promise<Array<RollToShow>> => {
  const rolls = await prisma.roll.findMany({
    select: {
      id: true,
      rollNo: true,
      inspectedBy1: true,
      startTime: true,
      customer: {
        select: {
          name: true,
        },
      },
      conclusion: {
        select: {
          conclusion: true,
        },
      },
      machine: {
        select: {
          machine: true,
        },
      },
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return rolls.map((roll) => ({
    id: roll.id,
    rollNo: roll.rollNo,
    inspectedBy1: roll.inspectedBy1,
    startTime: roll.startTime,
    customerName: roll.customer.name,
    conclusionName: roll.conclusion.conclusion,
    machineName: roll.machine.machine,
  }));
};
