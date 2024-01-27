/*
  Warnings:

  - You are about to drop the column `lookupFuelConsumption` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `lookupFuelUnitPrice` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "lookupFuelConsumption",
DROP COLUMN "lookupFuelUnitPrice",
ADD COLUMN     "luAllowanceDriving" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "luAllowanceMeal" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "luAllowanceTravel" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "luFuelConsumption" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "luFuelUnitPrice" TEXT NOT NULL DEFAULT '';
