-- AlterTable
ALTER TABLE "Remark" ADD COLUMN     "fk_project" TEXT;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_project_fkey" FOREIGN KEY ("fk_project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
