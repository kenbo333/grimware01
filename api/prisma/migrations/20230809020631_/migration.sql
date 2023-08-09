/*
  Warnings:

  - Made the column `companyName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyName_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchName` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchName_kana` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fax` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employmentStatus` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fax` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDay` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthMonth` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthYear` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "companyName" SET NOT NULL,
ALTER COLUMN "companyName" SET DEFAULT '',
ALTER COLUMN "companyName_kana" SET NOT NULL,
ALTER COLUMN "companyName_kana" SET DEFAULT '',
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "firstName_kana" SET NOT NULL,
ALTER COLUMN "firstName_kana" SET DEFAULT '',
ALTER COLUMN "lastName_kana" SET NOT NULL,
ALTER COLUMN "lastName_kana" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyBranch" ALTER COLUMN "branchName" SET NOT NULL,
ALTER COLUMN "branchName" SET DEFAULT '',
ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address1" SET DEFAULT '',
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '',
ALTER COLUMN "branchName_kana" SET NOT NULL,
ALTER COLUMN "branchName_kana" SET DEFAULT '',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "fax" SET NOT NULL,
ALTER COLUMN "fax" SET DEFAULT '',
ALTER COLUMN "postcode" SET NOT NULL,
ALTER COLUMN "postcode" SET DEFAULT '',
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "tel" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address1" SET DEFAULT '',
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '',
ALTER COLUMN "employmentStatus" SET NOT NULL,
ALTER COLUMN "employmentStatus" SET DEFAULT '',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT '',
ALTER COLUMN "postcode" SET NOT NULL,
ALTER COLUMN "postcode" SET DEFAULT '',
ALTER COLUMN "fax" SET NOT NULL,
ALTER COLUMN "fax" SET DEFAULT '',
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "tel" SET DEFAULT '',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "firstName_kana" SET NOT NULL,
ALTER COLUMN "firstName_kana" SET DEFAULT '',
ALTER COLUMN "lastName_kana" SET NOT NULL,
ALTER COLUMN "lastName_kana" SET DEFAULT '',
ALTER COLUMN "birthDay" SET NOT NULL,
ALTER COLUMN "birthDay" SET DEFAULT -1,
ALTER COLUMN "birthMonth" SET NOT NULL,
ALTER COLUMN "birthMonth" SET DEFAULT -1,
ALTER COLUMN "birthYear" SET NOT NULL,
ALTER COLUMN "birthYear" SET DEFAULT -1;
