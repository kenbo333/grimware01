-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_monthlyReportId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseDetail" DROP CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_carId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_projectId_fkey";

-- AlterTable
ALTER TABLE "DailyReport" ALTER COLUMN "fk_companyId" DROP NOT NULL,
ALTER COLUMN "fk_companyId" DROP DEFAULT,
ALTER COLUMN "fk_companyEmployeeId" DROP NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" DROP DEFAULT,
ALTER COLUMN "fk_monthlyReportId" DROP NOT NULL,
ALTER COLUMN "fk_monthlyReportId" DROP DEFAULT,
ALTER COLUMN "fk_car" DROP NOT NULL,
ALTER COLUMN "fk_car" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "fk_companyEmployeeId" DROP NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ExpenseDetail" ALTER COLUMN "fk_monthlyReportId" DROP NOT NULL,
ALTER COLUMN "fk_monthlyReportId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ProjectPurchase" ALTER COLUMN "fk_companyId" DROP NOT NULL,
ALTER COLUMN "fk_companyId" DROP DEFAULT,
ALTER COLUMN "fk_projectId" DROP NOT NULL,
ALTER COLUMN "fk_projectId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ProjectSub" ALTER COLUMN "fk_companyId" DROP NOT NULL,
ALTER COLUMN "fk_companyId" DROP DEFAULT,
ALTER COLUMN "fk_projectId" DROP NOT NULL,
ALTER COLUMN "fk_projectId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Remark" ALTER COLUMN "fk_carId" DROP NOT NULL,
ALTER COLUMN "fk_carId" DROP DEFAULT,
ALTER COLUMN "fk_companyEmployeeId" DROP NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" DROP DEFAULT,
ALTER COLUMN "fk_projectId" DROP NOT NULL,
ALTER COLUMN "fk_projectId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
