/*
  Warnings:

  - You are about to drop the column `isFile` on the `Remark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Remark" DROP COLUMN "isFile";

-- CreateTable
CREATE TABLE "EmployeeLicense" (
    "id" TEXT NOT NULL,
    "acquisitionDate" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "issuingAuthority" TEXT NOT NULL DEFAULT '',
    "licenseNumber" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT,
    "fileType" TEXT,
    "filePath" TEXT,
    "fk_companyEmployee" TEXT NOT NULL,

    CONSTRAINT "EmployeeLicense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeLicense" ADD CONSTRAINT "EmployeeLicense_fk_companyEmployee_fkey" FOREIGN KEY ("fk_companyEmployee") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
