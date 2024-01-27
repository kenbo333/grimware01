-- CreateTable
CREATE TABLE "PaidLeave" (
    "id" TEXT NOT NULL,
    "fk_companyEmployeeId" TEXT NOT NULL,
    "grantDate" TEXT NOT NULL,
    "grantDay" INTEGER NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "isExpiration" BOOLEAN NOT NULL DEFAULT false,
    "takenDates" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "PaidLeave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaidLeave" ADD CONSTRAINT "PaidLeave_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
