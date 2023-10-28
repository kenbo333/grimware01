-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "closingMonth" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyEmployee" ADD COLUMN     "laborCostDayShift" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "laborCostLateNightOvertime" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "laborCostNightShift" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "laborCostOvertime" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "fk_companyBranchId_own" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId_chief" TEXT NOT NULL DEFAULT '',
    "isDedicate" BOOLEAN,
    "fk_companyEmployeeId_safety" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId_foreman" TEXT NOT NULL DEFAULT '',
    "fk_company_prime" TEXT NOT NULL DEFAULT '',
    "fk_companyBranch_prime" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployee_prime" TEXT NOT NULL DEFAULT '',
    "fk_companyBranch_billing" TEXT NOT NULL DEFAULT '',
    "projectId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "name_kana" TEXT NOT NULL DEFAULT '',
    "shortName" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "clientNumber" TEXT NOT NULL DEFAULT '',
    "postcode" TEXT NOT NULL DEFAULT '',
    "address1" TEXT NOT NULL DEFAULT '',
    "address2" TEXT NOT NULL DEFAULT '',
    "distance" TEXT NOT NULL DEFAULT '',
    "tel" TEXT NOT NULL DEFAULT '',
    "projectStartDate" TEXT NOT NULL DEFAULT '',
    "projectEndDate" TEXT NOT NULL DEFAULT '',
    "ownProjectStartDate" TEXT NOT NULL DEFAULT '',
    "ownProjectEndDate" TEXT NOT NULL DEFAULT '',
    "estimateAmount" INTEGER NOT NULL DEFAULT 0,
    "contractAmount" INTEGER NOT NULL DEFAULT 0,
    "contractAmountWithTax" INTEGER NOT NULL DEFAULT 0,
    "isOrderLost" BOOLEAN NOT NULL DEFAULT false,
    "isConstructed" BOOLEAN NOT NULL DEFAULT false,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "laborCostWeekday" INTEGER NOT NULL DEFAULT 0,
    "laborCostHoliday" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
