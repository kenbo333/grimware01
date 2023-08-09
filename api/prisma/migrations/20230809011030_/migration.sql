/*
  Warnings:

  - The primary key for the `CompanyEmployee` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CompanyEmployee" DROP CONSTRAINT "CompanyEmployee_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CompanyEmployee_pkey" PRIMARY KEY ("id");
