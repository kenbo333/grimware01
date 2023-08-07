-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "f_ownCompany" BOOLEAN NOT NULL,
    "companyName" TEXT NOT NULL,
    "f_status" BOOLEAN NOT NULL,
    "f_prime" BOOLEAN NOT NULL,
    "f_sub" BOOLEAN NOT NULL,
    "f_purchase" BOOLEAN NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBranch" (
    "id" SERIAL NOT NULL,
    "fk_companyId" INTEGER NOT NULL,
    "branchName" TEXT NOT NULL,
    "f_status" BOOLEAN NOT NULL,

    CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyEmployee" (
    "id" SERIAL NOT NULL,
    "fk_companyId" INTEGER NOT NULL,
    "fk_companyBranchId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "f_status" BOOLEAN NOT NULL,

    CONSTRAINT "CompanyEmployee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyBranch" ADD CONSTRAINT "CompanyBranch_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
