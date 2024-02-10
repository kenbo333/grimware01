/*
  Warnings:

  - You are about to drop the column `projectId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectNumber]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectNumber` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_projectId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectId",
ADD COLUMN     "projectNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectNumber_key" ON "Project"("projectNumber");
