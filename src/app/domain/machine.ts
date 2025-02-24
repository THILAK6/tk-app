import { PrismaClient } from "@prisma/client";

export type Machine = {
  id: string;
  machine: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const getAllMachines = async (prisma: PrismaClient) => {
  return await prisma.machine.findMany();
};

export const getAllMachineNames = async (prisma: PrismaClient) => {
  const machines = await prisma.machine.findMany();
  return machines.map((machine) => machine.machine);
};
