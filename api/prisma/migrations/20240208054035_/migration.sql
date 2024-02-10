-- CreateTable
CREATE TABLE "MonthlyReportSub" (
    "id" TEXT NOT NULL,
    "fk_monthlyReport" TEXT NOT NULL,
    "fk_companyId" TEXT,
    "fk_companyBranchId" TEXT,
    "description" TEXT,
    "paymentAmount" INTEGER,
    "paymentDate" TEXT,

    CONSTRAINT "MonthlyReportSub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyReportSub" ADD CONSTRAINT "MonthlyReportSub_fk_monthlyReport_fkey" FOREIGN KEY ("fk_monthlyReport") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
