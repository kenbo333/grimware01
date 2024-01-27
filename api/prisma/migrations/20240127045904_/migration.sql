/*
  Warnings:

  - You are about to drop the column `isPaidLeave` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "isPaidLeave",
ADD COLUMN     "paidLeave" TEXT NOT NULL DEFAULT '';
