/*
  Warnings:

  - You are about to drop the column `fk_project` on the `MonthlyReport` table. All the data in the column will be lost.
  - You are about to drop the column `fk_project` on the `Remark` table. All the data in the column will be lost.
  - Added the required column `fk_projectId` to the `MonthlyReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MonthlyReport" DROP CONSTRAINT "MonthlyReport_fk_project_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_project_fkey";

-- AlterTable
ALTER TABLE "MonthlyReport" DROP COLUMN "fk_project",
ADD COLUMN     "fk_projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Remark" DROP COLUMN "fk_project",
ADD COLUMN     "fk_projectId" TEXT;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyReport" ADD CONSTRAINT "MonthlyReport_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
