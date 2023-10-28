/*
  Warnings:

  - Made the column `isDedicate` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "isDedicate" SET NOT NULL,
ALTER COLUMN "isDedicate" SET DEFAULT false;
