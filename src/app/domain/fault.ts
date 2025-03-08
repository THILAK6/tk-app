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

export const getLastFaultForRoll = async (
  prisma: PrismaClient,
  rollId: string
): Promise<Fault | null> => {
  return await prisma.fault.findFirst({
    where: {
      refRoll: rollId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

export type FaultCount = {
  name: string;
  value: number;
};

export const getFaultsCount = async (
  prisma: PrismaClient
): Promise<FaultCount[]> => {
  const faults = await prisma.fault.groupBy({
    by: ["faultTypeId"],
    _count: { faultTypeId: true },
  });

  const faultTypes = await prisma.faultType.findMany({
    select: { id: true, faultType: true },
  });

  return faults.map((fault) => {
    const faultType = faultTypes.find((ft) => ft.id === fault.faultTypeId);
    return {
      name: faultType ? faultType.faultType : "Unknown",
      value: fault._count.faultTypeId,
    };
  });
};
