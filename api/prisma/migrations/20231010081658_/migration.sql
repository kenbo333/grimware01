/*
  Warnings:

  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_fk_companyBranch_fkey";

-- DropTable
DROP TABLE "BankAccount";

-- CreateTable
CREATE TABLE "BranchBankAccount" (
    "id" TEXT NOT NULL,
    "fk_companyBranch" TEXT NOT NULL,
    "bankName" TEXT NOT NULL DEFAULT '',
    "branchName" TEXT NOT NULL DEFAULT '',
    "accountType" TEXT NOT NULL DEFAULT '',
    "accountNumber" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BranchBankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BranchBankAccount" ADD CONSTRAINT "BranchBankAccount_fk_companyBranch_fkey" FOREIGN KEY ("fk_companyBranch") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
