import { PrismaClient } from "@prisma/client";
import { getAllUserNames } from "./user";
import { getAllMachineNames } from "./machine";
import { getAllConclusionsConclusions } from "./conclusion";
import { getAllCustomerNames } from "./customer";
import { getAllInspectedTypesInspectedTypes } from "./inspectedType";

export const subjects = [
  "user",
  "machine",
  "conclusion",
  "inspectedType",
  "customer",
] as const;
export type Subject = (typeof subjects)[number];

export const isSubject = (other: string): other is Subject => subjects.includes(other as Subject);

export const getData: Record<
  Subject,
  (prisma: PrismaClient) => Promise<string[]>
> = {
  user: (prisma) => getAllUserNames(prisma),
  machine: (prisma) => getAllMachineNames(prisma),
  conclusion: (prisma) => getAllConclusionsConclusions(prisma),
  inspectedType: (prisma) => getAllInspectedTypesInspectedTypes(prisma),
  customer: (prisma) => getAllCustomerNames(prisma),
};

export const writeData: Record<
  Subject,
  (prisma: PrismaClient, data: string) => Promise<unknown>
> = {
  user: (prisma, data) => prisma.user.create({ data: { name: data } }),
  machine: (prisma, data) => prisma.machine.create({ data: { machine: data } }),
  conclusion: (prisma, data) =>
    prisma.conclusion.create({ data: { conclusion: data } }),
  inspectedType: (prisma, data) =>
    prisma.inspectedType.create({ data: { inspectedType: data } }),
  customer: (prisma, data) =>
    prisma.customer.create({ data: { name: data } }),
};

export const getTitle: Record<Subject, string> = {
  user: "User",
  machine: "Machine",
  conclusion: "Conclusion",
  inspectedType: "Inspected Type",
  customer: "Customer",
}
