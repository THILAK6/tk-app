import { PrismaClient } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export const getAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany();
};

export const getAllUserNames = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  return users.map((user) => user.name);
};
