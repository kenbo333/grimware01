-- AlterTable
ALTER TABLE "MonthlyReport" ADD COLUMN     "invoiceDueDate1" TEXT,
ADD COLUMN     "invoiceDueDate2" TEXT;

-- CreateTable
CREATE TABLE "DailyReport" (
    "id" TEXT NOT NULL,
    "idLock" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReportDetails" (
    "id" TEXT NOT NULL,
    "fk_dailyReport" TEXT,
    "fk_company" TEXT NOT NULL,
    "fk_companyEmployee" TEXT NOT NULL,
    "fk_monthlyReport" TEXT NOT NULL,
    "fk_car" TEXT NOT NULL,

    CONSTRAINT "DailyReportDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyReport_id_key" ON "DailyReport"("id");

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_dailyReport_fkey" FOREIGN KEY ("fk_dailyReport") REFERENCES "DailyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_companyEmployee_fkey" FOREIGN KEY ("fk_companyEmployee") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_monthlyReport_fkey" FOREIGN KEY ("fk_monthlyReport") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReportDetails" ADD CONSTRAINT "DailyReportDetails_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
