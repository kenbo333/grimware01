/*
  Warnings:

  - You are about to drop the column `laborChargeHoliday` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `laborChargeWeekday` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `markupRateExpense` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `markupRateMaterial` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `markupRateSubcontract` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `takenDates` on the `PaidLeave` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "laborChargeHoliday",
DROP COLUMN "laborChargeWeekday",
DROP COLUMN "markupRateExpense",
DROP COLUMN "markupRateMaterial",
DROP COLUMN "markupRateSubcontract";

-- AlterTable
ALTER TABLE "PaidLeave" DROP COLUMN "takenDates";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
