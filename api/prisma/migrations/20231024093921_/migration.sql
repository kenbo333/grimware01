/*
  Warnings:

  - You are about to drop the column `closingMonth` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "closingMonth";

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "closingMonth" TEXT NOT NULL DEFAULT '';
