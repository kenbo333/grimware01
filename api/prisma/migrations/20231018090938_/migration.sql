/*
  Warnings:

  - You are about to drop the column `carName` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyName_kana` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `branchName` on the `CompanyBranch` table. All the data in the column will be lost.
  - You are about to drop the column `branchName_kana` on the `CompanyBranch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "carName",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyName",
DROP COLUMN "companyName_kana",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name_kana" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyBranch" DROP COLUMN "branchName",
DROP COLUMN "branchName_kana",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name_kana" TEXT NOT NULL DEFAULT '';
