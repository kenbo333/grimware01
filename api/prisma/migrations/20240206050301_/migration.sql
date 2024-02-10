/*
  Warnings:

  - You are about to drop the column `SalesTaxRate` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "SalesTaxRate",
ADD COLUMN     "salesTaxRate" TEXT NOT NULL DEFAULT '';
