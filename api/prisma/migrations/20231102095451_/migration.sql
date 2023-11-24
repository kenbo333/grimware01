/*
  Warnings:

  - You are about to drop the column `closingDate` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "closingDate",
ADD COLUMN     "closingDay" TEXT NOT NULL DEFAULT '';
