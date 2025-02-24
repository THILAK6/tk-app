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

export const createRoll = async (
  rollEntry: RollEntry,
  prisma: PrismaClient
) => {
  return await prisma.roll.create({
    data: rollEntry,
  });
};
