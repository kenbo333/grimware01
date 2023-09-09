/*
  Warnings:

  - You are about to drop the column `f_status` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `f_ownCompany` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `f_prime` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `f_purchase` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `f_status` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `f_sub` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `f_status` on the `CompanyBranch` table. All the data in the column will be lost.
  - You are about to drop the column `f_status` on the `CompanyEmployee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "f_status",
ADD COLUMN     "isStatus" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "f_ownCompany",
DROP COLUMN "f_prime",
DROP COLUMN "f_purchase",
DROP COLUMN "f_status",
DROP COLUMN "f_sub",
ADD COLUMN     "isOwnCompany" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPrime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPurchase" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSub" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CompanyBranch" DROP COLUMN "f_status",
ADD COLUMN     "isStatus" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "CompanyEmployee" DROP COLUMN "f_status",
ADD COLUMN     "isStatus" BOOLEAN NOT NULL DEFAULT true;
