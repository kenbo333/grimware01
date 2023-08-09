-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "companyName_kana" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CompanyBranch" ALTER COLUMN "branchName" DROP NOT NULL,
ALTER COLUMN "branchName_kana" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
