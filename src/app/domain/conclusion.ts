import { PrismaClient } from "@prisma/client";

export type Conclusion = {
  id: string;
  conclusion: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const getAllConclusions = async (prisma: PrismaClient) => {
  return await prisma.conclusion.findMany();
};

export const getAllConclusionsConclusions = async (prisma: PrismaClient) => {
  const conclusions = await prisma.conclusion.findMany();
  return conclusions.map((conclusion) => conclusion.conclusion);
};
