/*
  Warnings:

  - Made the column `inspectionStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inspectionEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `CarMaintenance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "inspectionStartDate" SET NOT NULL,
ALTER COLUMN "inspectionStartDate" SET DEFAULT '',
ALTER COLUMN "inspectionStartDate" SET DATA TYPE TEXT,
ALTER COLUMN "inspectionEndDate" SET NOT NULL,
ALTER COLUMN "inspectionEndDate" SET DEFAULT '',
ALTER COLUMN "inspectionEndDate" SET DATA TYPE TEXT,
ALTER COLUMN "compInsStartDate" SET NOT NULL,
ALTER COLUMN "compInsStartDate" SET DEFAULT '',
ALTER COLUMN "compInsStartDate" SET DATA TYPE TEXT,
ALTER COLUMN "compInsEndDate" SET NOT NULL,
ALTER COLUMN "compInsEndDate" SET DEFAULT '',
ALTER COLUMN "compInsEndDate" SET DATA TYPE TEXT,
ALTER COLUMN "volInsStartDate" SET NOT NULL,
ALTER COLUMN "volInsStartDate" SET DEFAULT '',
ALTER COLUMN "volInsStartDate" SET DATA TYPE TEXT,
ALTER COLUMN "volInsEndDate" SET NOT NULL,
ALTER COLUMN "volInsEndDate" SET DEFAULT '',
ALTER COLUMN "volInsEndDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CarMaintenance" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT '',
ALTER COLUMN "date" SET DATA TYPE TEXT;
