/*
  Warnings:

  - You are about to drop the column `fk_fuelTypeId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the `CarFuelType` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fk_fuelTypeId",
ADD COLUMN     "fuelType" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "CarFuelType";
