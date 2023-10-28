/*
  Warnings:

  - You are about to drop the `ProjIdCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProjIdCounter";

-- CreateTable
CREATE TABLE "ProjectPurchase" (
    "id" TEXT NOT NULL,
    "fk_project" TEXT,
    "fk_company" TEXT,

    CONSTRAINT "ProjectPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCompany" (
    "id" TEXT NOT NULL,
    "fk_project" TEXT,
    "fk_company" TEXT,

    CONSTRAINT "ProjectCompany_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_project_fkey" FOREIGN KEY ("fk_project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCompany" ADD CONSTRAINT "ProjectCompany_fk_project_fkey" FOREIGN KEY ("fk_project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCompany" ADD CONSTRAINT "ProjectCompany_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
