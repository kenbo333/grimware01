/*
  Warnings:

  - You are about to drop the column `companyId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_companyId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk_companyEmployeeId_chief_fkey" FOREIGN KEY ("fk_companyEmployeeId_chief") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
