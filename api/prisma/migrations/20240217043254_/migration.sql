/*
  Warnings:

  - You are about to drop the column `fk_projectId` on the `PurchaseDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PurchaseDetail" DROP COLUMN "fk_projectId";

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_projectNumber_fkey" FOREIGN KEY ("projectNumber") REFERENCES "Project"("projectNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
