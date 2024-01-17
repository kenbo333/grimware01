-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "dailyReport1" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "dailyReport2" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "dailyReport3" TEXT[] DEFAULT ARRAY[]::TEXT[];
