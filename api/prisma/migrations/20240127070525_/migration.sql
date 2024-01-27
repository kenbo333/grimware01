/*
  Warnings:

  - You are about to drop the column `paidLeave` on the `DailyReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyReport" DROP COLUMN "paidLeave",
ADD COLUMN     "fk_paidLeaveId" TEXT;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_paidLeaveId_fkey" FOREIGN KEY ("fk_paidLeaveId") REFERENCES "PaidLeave"("id") ON DELETE SET NULL ON UPDATE CASCADE;
