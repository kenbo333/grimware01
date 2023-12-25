/*
  Warnings:

  - Made the column `fk_dailyReport` on table `DailyReportDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_dailyReport_fkey";

-- AlterTable
ALTER TABLE "DailyReportDetail" ALTER COLUMN "fk_dailyReport" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_dailyReport_fkey" FOREIGN KEY ("fk_dailyReport") REFERENCES "DailyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
