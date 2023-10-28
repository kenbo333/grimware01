/*
  Warnings:

  - You are about to drop the column `fk_companyBranch` on the `BranchBankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyBranch` on the `BranchPermitNotice` table. All the data in the column will be lost.
  - You are about to drop the column `fk_fuelType` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `fk_car` on the `CarMaintenance` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyEmployee` on the `EmployeeLicense` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyBranch_billing` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyBranch_prime` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyEmployee_prime` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fk_company_prime` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `fk_company` on the `ProjectPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `fk_project` on the `ProjectPurchase` table. All the data in the column will be lost.
  - You are about to drop the column `fk_company` on the `ProjectSub` table. All the data in the column will be lost.
  - You are about to drop the column `fk_project` on the `ProjectSub` table. All the data in the column will be lost.
  - You are about to drop the column `fk_car` on the `Remark` table. All the data in the column will be lost.
  - You are about to drop the column `fk_companyEmployee` on the `Remark` table. All the data in the column will be lost.
  - Added the required column `fk_companyBranchId` to the `BranchBankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_companyBranchId` to the `BranchPermitNotice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_carId` to the `CarMaintenance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_companyEmployeeId` to the `EmployeeLicense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BranchBankAccount" DROP CONSTRAINT "BranchBankAccount_fk_companyBranch_fkey";

-- DropForeignKey
ALTER TABLE "BranchPermitNotice" DROP CONSTRAINT "BranchPermitNotice_fk_companyBranch_fkey";

-- DropForeignKey
ALTER TABLE "CarMaintenance" DROP CONSTRAINT "CarMaintenance_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeLicense" DROP CONSTRAINT "EmployeeLicense_fk_companyEmployee_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_project_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_project_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_companyEmployee_fkey";

-- AlterTable
ALTER TABLE "BranchBankAccount" DROP COLUMN "fk_companyBranch",
ADD COLUMN     "fk_companyBranchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BranchPermitNotice" DROP COLUMN "fk_companyBranch",
ADD COLUMN     "fk_companyBranchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fk_fuelType",
ADD COLUMN     "fk_fuelTypeId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CarMaintenance" DROP COLUMN "fk_car",
ADD COLUMN     "fk_carId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeLicense" DROP COLUMN "fk_companyEmployee",
ADD COLUMN     "fk_companyEmployeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "fk_companyBranch_billing",
DROP COLUMN "fk_companyBranch_prime",
DROP COLUMN "fk_companyEmployee_prime",
DROP COLUMN "fk_company_prime",
ADD COLUMN     "fk_companyBranchId_billing" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fk_companyBranchId_prime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fk_companyEmployeeId_prime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fk_companyId_prime" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProjectPurchase" DROP COLUMN "fk_company",
DROP COLUMN "fk_project",
ADD COLUMN     "fk_companyId" TEXT,
ADD COLUMN     "fk_projectId" TEXT;

-- AlterTable
ALTER TABLE "ProjectSub" DROP COLUMN "fk_company",
DROP COLUMN "fk_project",
ADD COLUMN     "fk_companyId" TEXT,
ADD COLUMN     "fk_projectId" TEXT;

-- AlterTable
ALTER TABLE "Remark" DROP COLUMN "fk_car",
DROP COLUMN "fk_companyEmployee",
ADD COLUMN     "fk_carId" TEXT,
ADD COLUMN     "fk_companyEmployeeId" TEXT;

-- AddForeignKey
ALTER TABLE "CarMaintenance" ADD CONSTRAINT "CarMaintenance_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLicense" ADD CONSTRAINT "EmployeeLicense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchBankAccount" ADD CONSTRAINT "BranchBankAccount_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchPermitNotice" ADD CONSTRAINT "BranchPermitNotice_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
