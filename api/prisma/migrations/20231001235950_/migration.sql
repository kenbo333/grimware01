-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "fk_companyBranch" TEXT NOT NULL,
    "bankName" TEXT NOT NULL DEFAULT '',
    "branchName" TEXT NOT NULL DEFAULT '',
    "accountType" TEXT NOT NULL DEFAULT '',
    "accountNumber" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermitNotice" (
    "id" TEXT NOT NULL,
    "fk_companyBranch" TEXT NOT NULL,
    "industryType" TEXT NOT NULL DEFAULT '',
    "approvingAuthority" TEXT NOT NULL DEFAULT '',
    "permitType" TEXT NOT NULL DEFAULT '',
    "permitNumber" TEXT NOT NULL DEFAULT '',
    "approvalDate" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "PermitNotice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_fk_companyBranch_fkey" FOREIGN KEY ("fk_companyBranch") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermitNotice" ADD CONSTRAINT "PermitNotice_fk_companyBranch_fkey" FOREIGN KEY ("fk_companyBranch") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
