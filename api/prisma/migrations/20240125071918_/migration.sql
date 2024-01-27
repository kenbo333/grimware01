/*
  Warnings:

  - You are about to drop the column `luAllowanceDriving` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `luAllowanceMeal` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `luAllowanceTravel` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `luFuelConsumption` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `luFuelUnitPrice` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "luAllowanceDriving",
DROP COLUMN "luAllowanceMeal",
DROP COLUMN "luAllowanceTravel",
DROP COLUMN "luFuelConsumption",
DROP COLUMN "luFuelUnitPrice",
ADD COLUMN     "calcFuelCost" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "calcLaborCost" TEXT NOT NULL DEFAULT '';
