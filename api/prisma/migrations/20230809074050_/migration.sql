/*
  Warnings:

  - Made the column `birthDay` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthMonth` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthYear` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "birthDay" SET NOT NULL,
ALTER COLUMN "birthDay" SET DEFAULT '',
ALTER COLUMN "birthDay" SET DATA TYPE TEXT,
ALTER COLUMN "birthMonth" SET NOT NULL,
ALTER COLUMN "birthMonth" SET DEFAULT '',
ALTER COLUMN "birthMonth" SET DATA TYPE TEXT,
ALTER COLUMN "birthYear" SET NOT NULL,
ALTER COLUMN "birthYear" SET DEFAULT '',
ALTER COLUMN "birthYear" SET DATA TYPE TEXT;
