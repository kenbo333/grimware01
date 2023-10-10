-- AlterTable
ALTER TABLE "CompanyEmployee" ADD COLUMN     "bloodPressureDown" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bloodPressureUp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "entryDate" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "medicalHistory" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "routineCheckupDate" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "routineCheckupHospital" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "specialCheckupDate" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "specialCheckupHospital" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearsOfExperience" TEXT NOT NULL DEFAULT '';
