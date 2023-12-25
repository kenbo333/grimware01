/*
  Warnings:

  - You are about to drop the `DailyReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyReportDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_companyEmployee_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_dailyReport_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetail" DROP CONSTRAINT "DailyReportDetail_fk_monthlyReport_fkey";

-- DropTable
DROP TABLE "DailyReport";

-- DropTable
DROP TABLE "DailyReportDetail";
