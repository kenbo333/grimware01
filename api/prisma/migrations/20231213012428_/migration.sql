-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_companyEmployee_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "DailyReportDetails" DROP CONSTRAINT "DailyReportDetails_fk_monthlyReport_fkey";

-- AlterTable
ALTER TABLE "DailyReportDetails" ALTER COLUMN "fk_company" DROP NOT NULL,
ALTER COLUMN "fk_companyEmployee" DROP NOT NULL,
ALTER COLUMN "fk_monthlyReport" DROP NOT NULL,
ALTER COLUMN "fk_car" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_companyEmployee_fkey" FOREIGN KEY ("fk_companyEmployee") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_monthlyReport_fkey" FOREIGN KEY ("fk_monthlyReport") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
