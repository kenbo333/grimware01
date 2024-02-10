-- AlterTable
ALTER TABLE "MonthlyReport" ALTER COLUMN "invoiceAmount" DROP NOT NULL,
ALTER COLUMN "invoiceAmount" DROP DEFAULT,
ALTER COLUMN "invoiceAmountWithTax" DROP NOT NULL,
ALTER COLUMN "invoiceAmountWithTax" DROP DEFAULT;
