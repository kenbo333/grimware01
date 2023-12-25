/*
  Warnings:

  - You are about to drop the `DailyReportDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_companyEmployee_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_dailyReport_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_monthlyReport_fkey";

-- DropTable
DROP TABLE "DailyReportDetails";

-- CreateTable
CREATE TABLE "DailyReportDetail" (
    "id" TEXT NOT NULL,
    "fk_dailyReport" TEXT,
    "fk_company" TEXT,
    "fk_companyEmployee" TEXT,
    "fk_monthlyReport" TEXT,
    "fk_car" TEXT,

    CONSTRAINT "DailyReportDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_dailyReport_fkey" FOREIGN KEY ("fk_dailyReport") REFERENCES "DailyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_companyEmployee_fkey" FOREIGN KEY ("fk_companyEmployee") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_monthlyReport_fkey" FOREIGN KEY ("fk_monthlyReport") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetail" ADD CONSTRAINT "DailyReportDetail_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
