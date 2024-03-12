-- AlterTable
ALTER TABLE "CompanyEmployee" ADD COLUMN     "isAutoDailyReportCreate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PaidLeave" ALTER COLUMN "grantDate" SET DEFAULT '',
ALTER COLUMN "grantDay" DROP NOT NULL,
ALTER COLUMN "expirationDate" SET DEFAULT '';
