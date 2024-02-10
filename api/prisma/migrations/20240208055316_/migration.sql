/*
  Warnings:

  - You are about to drop the column `fk_monthlyReport` on the `MonthlyReportSub` table. All the data in the column will be lost.
  - Added the required column `fk_monthlyReportId` to the `MonthlyReportSub` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MonthlyReportSub" DROP CONSTRAINT "MonthlyReportSub_fk_monthlyReport_fkey";

-- AlterTable
ALTER TABLE "MonthlyReportSub" DROP COLUMN "fk_monthlyReport",
ADD COLUMN     "fk_monthlyReportId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MonthlyReportSub" ADD CONSTRAINT "MonthlyReportSub_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
