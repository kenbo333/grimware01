/*
  Warnings:

  - You are about to drop the column `email` on the `CompanyEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `fax` on the `CompanyEmployee` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `CompanyEmployee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CompanyEmployee" DROP COLUMN "email",
DROP COLUMN "fax",
DROP COLUMN "tel",
ADD COLUMN     "bloodType" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bloodTypeRh" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "calendarName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "compEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "compMobile" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgAddress1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgAddress2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgFirstName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgFirstName_kana" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgLastName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgLastName_kana" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgPhone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgPostcode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emgRelation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "employeeNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "homePhone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "persEmail" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "persMobile" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "placeOfOrigin" TEXT NOT NULL DEFAULT '';
