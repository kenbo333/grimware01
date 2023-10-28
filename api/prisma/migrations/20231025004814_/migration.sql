/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ProjIdCounter" (
    "prefix" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ProjIdCounter_pkey" PRIMARY KEY ("prefix")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectId_key" ON "Project"("projectId");
