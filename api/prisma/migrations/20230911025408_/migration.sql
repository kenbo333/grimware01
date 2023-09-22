/*
  Warnings:

  - You are about to drop the column `filePathe` on the `Remark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Remark" DROP COLUMN "filePathe",
ADD COLUMN     "filePath" TEXT;
