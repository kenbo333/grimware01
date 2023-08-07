/*
  Warnings:

  - Added the required column `branchName_kana` to the `CompanyBranch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `CompanyEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyBranch" ADD COLUMN     "address1" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "branchName_kana" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "tel" TEXT;

-- AlterTable
ALTER TABLE "CompanyEmployee" ADD COLUMN     "address1" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "employmentStatus" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "postcode" TEXT;
