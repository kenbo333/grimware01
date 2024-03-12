-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_fk_companyEmployeeId_chief_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "fk_companyEmployeeId_chief" DROP NOT NULL,
ALTER COLUMN "fk_companyEmployeeId_chief" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk_companyEmployeeId_chief_fkey" FOREIGN KEY ("fk_companyEmployeeId_chief") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
