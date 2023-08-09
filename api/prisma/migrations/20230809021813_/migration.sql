-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "f_ownCompany" SET DEFAULT false,
ALTER COLUMN "f_status" SET DEFAULT true,
ALTER COLUMN "f_prime" SET DEFAULT false,
ALTER COLUMN "f_sub" SET DEFAULT false,
ALTER COLUMN "f_purchase" SET DEFAULT false;

-- AlterTable
ALTER TABLE "CompanyBranch" ALTER COLUMN "f_status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "f_status" SET DEFAULT true;
