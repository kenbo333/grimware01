-- CreateTable
CREATE TABLE "Daily" (
    "id" TEXT NOT NULL,
    "isLock" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyReport" (
    "id" TEXT NOT NULL,
    "fk_daily" TEXT NOT NULL,
    "fk_company" TEXT,
    "fk_companyEmployee" TEXT,
    "fk_monthlyReport" TEXT,
    "fk_car" TEXT,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Daily_id_key" ON "Daily"("id");

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_daily_fkey" FOREIGN KEY ("fk_daily") REFERENCES "Daily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_company_fkey" FOREIGN KEY ("fk_company") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyEmployee_fkey" FOREIGN KEY ("fk_companyEmployee") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_monthlyReport_fkey" FOREIGN KEY ("fk_monthlyReport") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
