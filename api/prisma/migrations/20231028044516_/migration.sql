/*
  Warnings:

  - You are about to drop the `ProjectCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectCompany" DROP CONSTRAINT "ProjectCompany_fk_company_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCompany" DROP CONSTRAINT "ProjectCompany_fk_project_fkey";

-- DropTable
DROP TABLE "ProjectCompany";

-- CreateTable
CREATE TABLE "ProjectSub" (
    "id" TEXT NOT NULL,
    "fk_project" TEXT,
    "fk_company" TEXT,

    CONSTRAINT "ProjectSub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_project_fkey" FOREIGN KEY ("fk_project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
