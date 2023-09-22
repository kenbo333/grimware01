/*
  Warnings:

  - Made the column `date` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `Remark` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Remark" ADD COLUMN     "isFile" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT '',
ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '';
