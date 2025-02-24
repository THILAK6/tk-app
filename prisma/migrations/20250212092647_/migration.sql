/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Fault" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "refRoll" TEXT NOT NULL,
    "faultLength" REAL NOT NULL,
    "time" DATETIME NOT NULL,
    "faultTypeId" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Fault_refRoll_fkey" FOREIGN KEY ("refRoll") REFERENCES "Roll" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Fault_faultTypeId_fkey" FOREIGN KEY ("faultTypeId") REFERENCES "FaultType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "machine" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Conclusion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conclusion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "InspectedType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspectedType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "Roll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siNo" TEXT NOT NULL,
    "inspectedBy1" TEXT NOT NULL,
    "inspectedBy2" TEXT NOT NULL,
    "inspectedTypeId" TEXT NOT NULL,
    "inspectedQnty" REAL NOT NULL,
    "rollNo" TEXT NOT NULL,
    "inspectionMachineId" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "skipNo" TEXT NOT NULL,
    "prdn" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "packedBy1" TEXT NOT NULL,
    "packedBy2" TEXT NOT NULL,
    "note" TEXT,
    "customerId" TEXT NOT NULL,
    "conclusionId" TEXT NOT NULL,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Roll_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Roll_inspectedTypeId_fkey" FOREIGN KEY ("inspectedTypeId") REFERENCES "InspectedType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Roll_inspectionMachineId_fkey" FOREIGN KEY ("inspectionMachineId") REFERENCES "Machine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Roll_conclusionId_fkey" FOREIGN KEY ("conclusionId") REFERENCES "Conclusion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FaultType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faultType" TEXT NOT NULL,
    "faultCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_User" ("id", "name") SELECT "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
