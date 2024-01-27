-- AlterTable
ALTER TABLE "DailyReport" ADD COLUMN     "lookupDistance" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lookupFuelConsumption" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lookupFuelUnitPrice" TEXT NOT NULL DEFAULT '';
