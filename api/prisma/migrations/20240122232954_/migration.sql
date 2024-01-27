/*
  Warnings:

  - You are about to drop the column `fk_car` on the `DailyReport` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_car_fkey";

-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "fk_car",
ADD COLUMN     "fk_carId" TEXT;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
