-- AlterTable
ALTER TABLE "Remark" ADD COLUMN     "date" TEXT,
ADD COLUMN     "fileData" BYTEA,
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "remark" TEXT;
