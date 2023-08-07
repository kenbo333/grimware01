/*
  Warnings:

  - You are about to drop the column `birthdate` on the `CompanyEmployee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyEmployee" DROP COLUMN "birthdate",
ADD COLUMN     "birthday" INTEGER,
ADD COLUMN     "birthmonth" INTEGER,
ADD COLUMN     "birthyear" INTEGER;
