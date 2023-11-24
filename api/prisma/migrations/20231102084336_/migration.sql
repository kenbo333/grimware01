-- CreateTable
CREATE TABLE "MonthlyReport" (
    "id" TEXT NOT NULL,
    "fk_project" TEXT NOT NULL,
    "closingDate" TEXT NOT NULL,
    "invoiceDate" TEXT NOT NULL DEFAULT '',
    "invoiceAmount" INTEGER NOT NULL DEFAULT 0,
    "invoiceAmountWithTax" INTEGER NOT NULL DEFAULT 0,
    "paymentDate1" TEXT NOT NULL DEFAULT '',
    "paymentDate2" TEXT NOT NULL DEFAULT '',
    "paymentCash1" INTEGER,
    "paymentCash2" INTEGER,
    "paymentNote1" INTEGER,
    "paymentNote2" INTEGER,
    "paymentEBond1" INTEGER,
    "paymentEBond2" INTEGER,
    "adjustmentAmount" INTEGER,

    CONSTRAINT "MonthlyReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MonthlyReport" ADD CONSTRAINT "MonthlyReport_fk_project_fkey" FOREIGN KEY ("fk_project") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
