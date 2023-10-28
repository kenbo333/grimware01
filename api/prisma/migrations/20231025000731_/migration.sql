/*
  Warnings:

  - The `closingMonth` column on the `Option` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "closingMonth",
ADD COLUMN     "closingMonth" INTEGER;
