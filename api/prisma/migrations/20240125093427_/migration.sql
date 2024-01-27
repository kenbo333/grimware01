/*
  Warnings:

  - You are about to drop the column `businessTripAllowance` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `drivingAllowance` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `nightMealAllowance` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "businessTripAllowance",
DROP COLUMN "drivingAllowance",
DROP COLUMN "nightMealAllowance",
ADD COLUMN     "driving" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isBusinessTrip" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNightMeal" BOOLEAN NOT NULL DEFAULT false;
