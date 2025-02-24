import { PrismaClient } from "@prisma/client";

export type Customer = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const getAllCustomers = async (prisma: PrismaClient) => {
  return await prisma.customer.findMany();
};

export const getAllCustomerNames = async (prisma: PrismaClient) => {
  const conclusions = await prisma.conclusion.findMany();
  return conclusions.map((conclusion) => conclusion.conclusion);
};
