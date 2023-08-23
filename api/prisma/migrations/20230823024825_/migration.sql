/*
  Warnings:

  - You are about to drop the column `carNumbar` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "carNumbar",
ADD COLUMN     "carNumber" TEXT NOT NULL DEFAULT '';
