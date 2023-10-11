/*
  Warnings:

  - You are about to drop the `PermitNotice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermitNotice" DROP CONSTRAINT "PermitNotice_fk_companyBranch_fkey";

-- DropTable
DROP TABLE "PermitNotice";

-- CreateTable
CREATE TABLE "BranchPermitNotice" (
    "id" TEXT NOT NULL,
    "fk_companyBranch" TEXT NOT NULL,
    "industryType" TEXT NOT NULL DEFAULT '',
    "approvingAuthority" TEXT NOT NULL DEFAULT '',
    "permitType" TEXT NOT NULL DEFAULT '',
    "permitNumber" TEXT NOT NULL DEFAULT '',
    "approvalDate" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BranchPermitNotice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BranchPermitNotice" ADD CONSTRAINT "BranchPermitNotice_fk_companyBranch_fkey" FOREIGN KEY ("fk_companyBranch") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
