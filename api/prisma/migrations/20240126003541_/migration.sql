/*
  Warnings:

  - You are about to drop the column `allowanceMeal` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `allowanceTravel` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "allowanceMeal",
DROP COLUMN "allowanceTravel",
ADD COLUMN     "allowanceBusinessTrip" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "allowanceNightMeal" TEXT NOT NULL DEFAULT '';
