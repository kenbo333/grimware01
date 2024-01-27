/*
  Warnings:

  - You are about to drop the column `lookupDistance` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `DailyReport` table. All the data in the column will be lost.
  - You are about to drop the column `dailyReport3` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "lookupDistance",
DROP COLUMN "option3";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "dailyReport3";
