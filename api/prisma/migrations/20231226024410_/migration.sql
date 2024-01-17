-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "advancePaymentAmount" TEXT,
ADD COLUMN     "advancePaymentDate" TEXT,
ADD COLUMN     "isInProcess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSettled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "yearMonth" TEXT;

-- CreateTable
CREATE TABLE "Daily" (
    "id" TEXT NOT NULL,
    "isLock" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReport" (
    "id" TEXT NOT NULL,
    "fk_dailyId" TEXT NOT NULL,
    "fk_companyId" TEXT,
    "fk_companyEmployeeId" TEXT,
    "fk_monthlyReportId" TEXT,
    "fk_car" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "breakTime" TEXT,
    "day" TEXT,
    "night" TEXT,
    "overtime" TEXT,
    "lateOvertime" TEXT,
    "businessTripAllowance" TEXT,
    "nightMealAllowance" TEXT,
    "drivingAllowance" TEXT,
    "etcFees" TEXT,
    "distance" TEXT,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,
    "isPaidLeave" BOOLEAN NOT NULL DEFAULT false,
    "isSpecialLeave" BOOLEAN NOT NULL DEFAULT false,
    "isParentalLeave" BOOLEAN NOT NULL DEFAULT false,
    "isCaregivingLeave" BOOLEAN NOT NULL DEFAULT false,
    "option1" TEXT,
    "option2" TEXT,
    "option3" TEXT,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseDetails" (
    "id" TEXT NOT NULL,
    "fk_expensesId" TEXT NOT NULL,
    "fk_monthlyReportId" TEXT,
    "date" TEXT,
    "amount" TEXT,
    "account" TEXT,
    "description" TEXT,
    "isCredit" TEXT,

    CONSTRAINT "ExpenseDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Daily_id_key" ON "Daily"("id");

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_dailyId_fkey" FOREIGN KEY ("fk_dailyId") REFERENCES "Daily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_fk_expensesId_fkey" FOREIGN KEY ("fk_expensesId") REFERENCES "Expenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
