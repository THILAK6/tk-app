import { PrismaClient } from "@prisma/client";

export type Fault = {
  id: string;
  date: Date;
  refRoll: string;
  faultLength: number;
  time: Date;
  faultTypeId: string;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type FaultWithoutMeta = Omit<
  Fault,
  "id" | "createdAt" | "updatedAt" | "version"
>;

export type FaultType = {
  id: string;
  faultType: string;
  faultCode: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const createFault = async (
  prisma: PrismaClient,
  fault: FaultWithoutMeta
): Promise<Fault> => {
  return await prisma.fault.create({
    data: fault,
  });
};

export const getAllFaultTypes = async (
  prisma: PrismaClient
): Promise<FaultType[]> => {
  return await prisma.faultType.findMany();
};
