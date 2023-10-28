/*
  Warnings:

  - Made the column `closingMonth` on table `Option` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "closingMonth" SET NOT NULL,
ALTER COLUMN "closingMonth" SET DEFAULT 3;
