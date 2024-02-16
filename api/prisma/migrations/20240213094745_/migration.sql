/*
  Warnings:

  - The `salesTaxRate` column on the `Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowanceDriving` column on the `Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowanceBusinessTrip` column on the `Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allowanceNightMeal` column on the `Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "salesTaxRate",
ADD COLUMN     "salesTaxRate" INTEGER,
DROP COLUMN "allowanceDriving",
ADD COLUMN     "allowanceDriving" INTEGER,
DROP COLUMN "allowanceBusinessTrip",
ADD COLUMN     "allowanceBusinessTrip" INTEGER,
DROP COLUMN "allowanceNightMeal",
ADD COLUMN     "allowanceNightMeal" INTEGER;
