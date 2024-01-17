/*
  Warnings:

  - You are about to drop the `ExpenseAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseAccount" DROP CONSTRAINT "ExpenseAccount_optionId_fkey";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "expenseAccount" TEXT;

-- DropTable
DROP TABLE "ExpenseAccount";
