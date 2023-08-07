/*
  Warnings:

  - You are about to drop the column `birthday` on the `CompanyEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `birthmonth` on the `CompanyEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `birthyear` on the `CompanyEmployee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyEmployee" DROP COLUMN "birthday",
DROP COLUMN "birthmonth",
DROP COLUMN "birthyear",
ADD COLUMN     "birthDay" INTEGER,
ADD COLUMN     "birthMonth" INTEGER,
ADD COLUMN     "birthYear" INTEGER;
