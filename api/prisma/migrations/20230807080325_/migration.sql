/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CompanyBranch` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CompanyBranch" DROP CONSTRAINT "CompanyBranch_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmployee" DROP CONSTRAINT "CompanyEmployee_fk_companyBranchId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmployee" DROP CONSTRAINT "CompanyEmployee_fk_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Company_id_seq";

-- AlterTable
ALTER TABLE "CompanyBranch" DROP CONSTRAINT "CompanyBranch_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CompanyBranch_id_seq";

-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "fk_companyId" SET DATA TYPE TEXT,
ALTER COLUMN "fk_companyBranchId" SET DATA TYPE TEXT;
DROP SEQUENCE "CompanyEmployee_id_seq";

-- AddForeignKey
ALTER TABLE "CompanyBranch" ADD CONSTRAINT "CompanyBranch_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
