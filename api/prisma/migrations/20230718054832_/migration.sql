/*
  Warnings:

  - Added the required column `companyName_kana` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyName_kana" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
