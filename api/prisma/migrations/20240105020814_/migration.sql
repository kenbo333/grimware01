/*
  Warnings:

  - The `isCredit` column on the `ExpenseDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ExpenseDetail" DROP COLUMN "isCredit",
ADD COLUMN     "isCredit" BOOLEAN NOT NULL DEFAULT false;
