/*
  Warnings:

  - You are about to drop the `ExpenseDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseDetails" DROP CONSTRAINT "ExpenseDetails_fk_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseDetails" DROP CONSTRAINT "ExpenseDetails_fk_monthlyReportId_fkey";

-- DropTable
DROP TABLE "ExpenseDetails";

-- CreateTable
CREATE TABLE "ExpenseDetail" (
    "id" TEXT NOT NULL,
    "fk_expenseId" TEXT NOT NULL,
    "fk_monthlyReportId" TEXT,
    "date" TEXT,
    "amount" TEXT,
    "account" TEXT,
    "description" TEXT,
    "isCredit" TEXT,

    CONSTRAINT "ExpenseDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_expenseId_fkey" FOREIGN KEY ("fk_expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
