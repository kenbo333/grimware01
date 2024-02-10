/*
  Warnings:

  - Made the column `fk_companyId` on table `ProjectPurchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_projectId` on table `ProjectPurchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyId` on table `ProjectSub` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_projectId` on table `ProjectSub` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectPurchase" ALTER COLUMN "fk_companyId" SET NOT NULL,
ALTER COLUMN "fk_projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProjectSub" ALTER COLUMN "fk_companyId" SET NOT NULL,
ALTER COLUMN "fk_projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
