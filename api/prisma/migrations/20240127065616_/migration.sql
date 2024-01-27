/*
  Warnings:

  - You are about to drop the column `isExpiration` on the `PaidLeave` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaidLeave" DROP COLUMN "isExpiration";
