import { PrismaClient } from "@prisma/client";

export type InspectedType = {
  id: string;
  inspectedType: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const getAllInspectedTypes = (prisma: PrismaClient) => {
  return prisma.inspectedType.findMany();
};

export const getAllInspectedTypesInspectedTypes = async (
  prisma: PrismaClient
) => {
  const inspectedTypes = await prisma.inspectedType.findMany();
  return inspectedTypes.map((inspectedType) => inspectedType.inspectedType);
};
