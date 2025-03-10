-- CreateTable
CREATE TABLE "CurrentRoll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "rollId" TEXT NOT NULL,
    CONSTRAINT "CurrentRoll_rollId_fkey" FOREIGN KEY ("rollId") REFERENCES "Roll" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
