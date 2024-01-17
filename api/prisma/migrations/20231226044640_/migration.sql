/*
  Warnings:

  - You are about to drop the column `fk_expensesId` on the `ExpenseDetails` table. All the data in the column will be lost.
  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fk_expenseId` to the `ExpenseDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpenseDetails" DROP CONSTRAINT "ExpenseDetails_fk_expensesId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_fk_companyEmployeeId_fkey";

-- AlterTable
ALTER TABLE "ExpenseDetails" DROP COLUMN "fk_expensesId",
ADD COLUMN     "fk_expenseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Expenses";

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "fk_companyEmployeeId" TEXT,
    "isInProcess" BOOLEAN NOT NULL DEFAULT false,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "advancePaymentDate" TEXT,
    "advancePaymentAmount" TEXT,
    "yearMonth" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_fk_expenseId_fkey" FOREIGN KEY ("fk_expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
