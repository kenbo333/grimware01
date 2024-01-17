/*
  Warnings:

  - You are about to drop the `Daily` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_companyEmployee_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_daily_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_monthlyReport_fkey";

-- DropTable
DROP TABLE "Daily";

-- DropTable
DROP TABLE "DailyReport";

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "fk_companyEmployeeId" TEXT,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
