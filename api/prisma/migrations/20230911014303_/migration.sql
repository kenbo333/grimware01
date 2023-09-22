/*
  Warnings:

  - You are about to drop the column `fileData` on the `Remark` table. All the data in the column will be lost.
  - You are about to drop the column `isFileData` on the `Remark` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Remark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Remark" DROP COLUMN "fileData",
DROP COLUMN "isFileData",
DROP COLUMN "mimeType",
ADD COLUMN     "filePathe" TEXT,
ADD COLUMN     "fileType" TEXT;
