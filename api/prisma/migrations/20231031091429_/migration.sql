-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "fk_companyId_prime" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk_companyId_prime_fkey" FOREIGN KEY ("fk_companyId_prime") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
