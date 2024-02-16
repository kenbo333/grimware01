/*
  Warnings:

  - You are about to drop the column `description` on the `ExpenseDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExpenseDetail" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "PurchaseDetail" (
    "id" TEXT NOT NULL,
    "fk_companyId" TEXT NOT NULL,
    "fk_companyBranchId" TEXT NOT NULL,
    "fk_projectId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "name" TEXT,
    "model" TEXT,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "remark" TEXT,

    CONSTRAINT "PurchaseDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
