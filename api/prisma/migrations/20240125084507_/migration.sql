/*
  Warnings:

  - The `calcFuelCost` column on the `DailyReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `calcLaborCost` column on the `DailyReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "calcFuelCost",
ADD COLUMN     "calcFuelCost" INTEGER,
DROP COLUMN "calcLaborCost",
ADD COLUMN     "calcLaborCost" INTEGER;
