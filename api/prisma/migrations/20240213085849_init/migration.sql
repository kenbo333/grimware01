-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "isOwn" BOOLEAN NOT NULL DEFAULT false,
    "isStatus" BOOLEAN NOT NULL DEFAULT true,
    "isPrime" BOOLEAN NOT NULL DEFAULT false,
    "isSub" BOOLEAN NOT NULL DEFAULT false,
    "isPurchase" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT '',
    "name_kana" TEXT NOT NULL DEFAULT '',
    "firstName" TEXT NOT NULL DEFAULT '',
    "firstName_kana" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "lastName_kana" TEXT NOT NULL DEFAULT '',
    "closingDay" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBranch" (
    "id" TEXT NOT NULL,
    "fk_companyId" TEXT NOT NULL,
    "isStatus" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT '',
    "name_kana" TEXT NOT NULL DEFAULT '',
    "postcode" TEXT NOT NULL DEFAULT '',
    "address1" TEXT NOT NULL DEFAULT '',
    "address2" TEXT NOT NULL DEFAULT '',
    "tel" TEXT NOT NULL DEFAULT '',
    "fax" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyEmployee" (
    "id" TEXT NOT NULL,
    "fk_companyId" TEXT NOT NULL,
    "fk_companyBranchId" TEXT NOT NULL,
    "isStatus" BOOLEAN NOT NULL DEFAULT true,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "firstName_kana" TEXT NOT NULL DEFAULT '',
    "lastName_kana" TEXT NOT NULL DEFAULT '',
    "birthYear" TEXT NOT NULL DEFAULT '',
    "birthMonth" TEXT NOT NULL DEFAULT '',
    "birthDay" TEXT NOT NULL DEFAULT '',
    "employmentStatus" TEXT NOT NULL DEFAULT '',
    "compMobile" TEXT NOT NULL DEFAULT '',
    "compEmail" TEXT NOT NULL DEFAULT '',
    "postcode" TEXT NOT NULL DEFAULT '',
    "address1" TEXT NOT NULL DEFAULT '',
    "address2" TEXT NOT NULL DEFAULT '',
    "homePhone" TEXT NOT NULL DEFAULT '',
    "persMobile" TEXT NOT NULL DEFAULT '',
    "persEmail" TEXT NOT NULL DEFAULT '',
    "department" TEXT NOT NULL DEFAULT '',
    "position" TEXT NOT NULL DEFAULT '',
    "entryDate" TEXT NOT NULL DEFAULT '',
    "yearsOfExperience" TEXT NOT NULL DEFAULT '',
    "routineCheckupDate" TEXT NOT NULL DEFAULT '',
    "routineCheckupHospital" TEXT NOT NULL DEFAULT '',
    "specialCheckupDate" TEXT NOT NULL DEFAULT '',
    "specialCheckupHospital" TEXT NOT NULL DEFAULT '',
    "bloodPressureUp" TEXT NOT NULL DEFAULT '',
    "bloodPressureDown" TEXT NOT NULL DEFAULT '',
    "medicalHistory" TEXT NOT NULL DEFAULT '',
    "employeeNumber" TEXT NOT NULL DEFAULT '',
    "calendarName" TEXT NOT NULL DEFAULT '',
    "placeOfOrigin" TEXT NOT NULL DEFAULT '',
    "bloodType" TEXT NOT NULL DEFAULT '',
    "bloodTypeRh" TEXT NOT NULL DEFAULT '',
    "emgLastName" TEXT NOT NULL DEFAULT '',
    "emgLastName_kana" TEXT NOT NULL DEFAULT '',
    "emgFirstName" TEXT NOT NULL DEFAULT '',
    "emgFirstName_kana" TEXT NOT NULL DEFAULT '',
    "emgRelation" TEXT NOT NULL DEFAULT '',
    "emgPhone" TEXT NOT NULL DEFAULT '',
    "isEmgAddressSame" BOOLEAN NOT NULL DEFAULT false,
    "emgPostcode" TEXT NOT NULL DEFAULT '',
    "emgAddress1" TEXT NOT NULL DEFAULT '',
    "emgAddress2" TEXT NOT NULL DEFAULT '',
    "laborCostDayShift" INTEGER,
    "laborCostNightShift" INTEGER,
    "laborCostOvertime" INTEGER,
    "laborCostLateOvertime" INTEGER,

    CONSTRAINT "CompanyEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "isStatus" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT '',
    "frameNumber" TEXT NOT NULL DEFAULT '',
    "model" TEXT NOT NULL DEFAULT '',
    "fuelType" TEXT NOT NULL DEFAULT '',
    "fuelConsumption" INTEGER,
    "carNumber" TEXT NOT NULL DEFAULT '',
    "firstRegistration" TEXT NOT NULL DEFAULT '',
    "etcNumber" TEXT NOT NULL DEFAULT '',
    "inspectionStartDate" TEXT NOT NULL DEFAULT '',
    "inspectionEndDate" TEXT NOT NULL DEFAULT '',
    "compInsCompanyName" TEXT NOT NULL DEFAULT '',
    "compInsNumber" TEXT NOT NULL DEFAULT '',
    "compInsStartDate" TEXT NOT NULL DEFAULT '',
    "compInsEndDate" TEXT NOT NULL DEFAULT '',
    "compInsContractorName" TEXT NOT NULL DEFAULT '',
    "volInsCompanyName" TEXT NOT NULL DEFAULT '',
    "volInsNumber" TEXT NOT NULL DEFAULT '',
    "volInsStartDate" TEXT NOT NULL DEFAULT '',
    "volInsEndDate" TEXT NOT NULL DEFAULT '',
    "volInsContractorName" TEXT NOT NULL DEFAULT '',
    "volInsAgeRequirement" TEXT NOT NULL DEFAULT '',
    "volInsPersonal" TEXT NOT NULL DEFAULT '',
    "volInsProperty" TEXT NOT NULL DEFAULT '',
    "volInsPassenger" TEXT NOT NULL DEFAULT '',
    "volInsCar" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarMaintenance" (
    "id" TEXT NOT NULL,
    "fk_carId" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "odometer" INTEGER,
    "cost" INTEGER,
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CarMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remark" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT NOT NULL DEFAULT '',
    "fileType" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT NOT NULL DEFAULT '',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "fk_companyEmployeeId" TEXT,
    "fk_carId" TEXT,
    "fk_projectId" TEXT,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeLicense" (
    "id" TEXT NOT NULL,
    "acquisitionDate" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "issuingAuthority" TEXT NOT NULL DEFAULT '',
    "licenseNumber" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT NOT NULL DEFAULT '',
    "fileType" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId" TEXT NOT NULL,

    CONSTRAINT "EmployeeLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchBankAccount" (
    "id" TEXT NOT NULL,
    "fk_companyBranchId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL DEFAULT '',
    "branchName" TEXT NOT NULL DEFAULT '',
    "accountType" TEXT NOT NULL DEFAULT '',
    "accountNumber" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BranchBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchPermitNotice" (
    "id" TEXT NOT NULL,
    "fk_companyBranchId" TEXT NOT NULL,
    "industryType" TEXT NOT NULL DEFAULT '',
    "approvingAuthority" TEXT NOT NULL DEFAULT '',
    "permitType" TEXT NOT NULL DEFAULT '',
    "permitNumber" TEXT NOT NULL DEFAULT '',
    "approvalDate" TEXT NOT NULL DEFAULT '',
    "expiryDate" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BranchPermitNotice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "fk_companyBranchId_own" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId_chief" TEXT NOT NULL DEFAULT '',
    "isDedicate" BOOLEAN NOT NULL DEFAULT false,
    "fk_companyEmployeeId_safety" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId_foreman" TEXT NOT NULL DEFAULT '',
    "fk_companyId_prime" TEXT NOT NULL,
    "fk_companyBranchId_prime" TEXT NOT NULL DEFAULT '',
    "fk_companyEmployeeId_prime" TEXT NOT NULL DEFAULT '',
    "fk_companyBranchId_billing" TEXT NOT NULL DEFAULT '',
    "projectNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "name_kana" TEXT NOT NULL DEFAULT '',
    "shortName" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "clientNumber" TEXT NOT NULL DEFAULT '',
    "postcode" TEXT NOT NULL DEFAULT '',
    "address1" TEXT NOT NULL DEFAULT '',
    "address2" TEXT NOT NULL DEFAULT '',
    "distance" INTEGER,
    "tel" TEXT NOT NULL DEFAULT '',
    "projectStartDate" TEXT NOT NULL DEFAULT '',
    "projectEndDate" TEXT NOT NULL DEFAULT '',
    "ownProjectStartDate" TEXT NOT NULL DEFAULT '',
    "ownProjectEndDate" TEXT NOT NULL DEFAULT '',
    "estimateAmount" INTEGER,
    "contractAmount" INTEGER,
    "contractAmountWithTax" INTEGER,
    "isOrderLost" BOOLEAN NOT NULL DEFAULT false,
    "isConstructed" BOOLEAN NOT NULL DEFAULT false,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPurchase" (
    "id" TEXT NOT NULL,
    "fk_projectId" TEXT NOT NULL,
    "fk_companyId" TEXT NOT NULL,

    CONSTRAINT "ProjectPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSub" (
    "id" TEXT NOT NULL,
    "fk_projectId" TEXT NOT NULL,
    "fk_companyId" TEXT NOT NULL,

    CONSTRAINT "ProjectSub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyReport" (
    "id" TEXT NOT NULL,
    "fk_projectId" TEXT NOT NULL,
    "closingDate" TEXT NOT NULL,
    "invoiceDate" TEXT NOT NULL DEFAULT '',
    "invoiceAmount" INTEGER,
    "invoiceAmountWithTax" INTEGER,
    "invoiceDueDate1" TEXT NOT NULL DEFAULT '',
    "invoiceDueDate2" TEXT NOT NULL DEFAULT '',
    "paymentDate1" TEXT NOT NULL DEFAULT '',
    "paymentDate2" TEXT NOT NULL DEFAULT '',
    "paymentCash1" INTEGER,
    "paymentCash2" INTEGER,
    "paymentNote1" INTEGER,
    "paymentNote2" INTEGER,
    "paymentEBond1" INTEGER,
    "paymentEBond2" INTEGER,
    "adjustmentAmount" INTEGER,

    CONSTRAINT "MonthlyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyReportSub" (
    "id" TEXT NOT NULL,
    "fk_monthlyReportId" TEXT NOT NULL,
    "fk_companyId" TEXT,
    "fk_companyBranchId" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "paymentAmount" INTEGER,
    "paymentDate" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "MonthlyReportSub_pkey" PRIMARY KEY ("id")
);

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
    "fk_carId" TEXT,
    "fk_paidLeaveId" TEXT,
    "startTime" TEXT NOT NULL DEFAULT '',
    "endTime" TEXT NOT NULL DEFAULT '',
    "breakTime" TEXT NOT NULL DEFAULT '',
    "day" DOUBLE PRECISION,
    "night" DOUBLE PRECISION,
    "overtime" DOUBLE PRECISION,
    "lateOvertime" DOUBLE PRECISION,
    "isBusinessTrip" BOOLEAN NOT NULL DEFAULT false,
    "isNightMeal" BOOLEAN NOT NULL DEFAULT false,
    "driving" INTEGER,
    "etcFees" INTEGER,
    "distance" INTEGER,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,
    "isSpecialLeave" BOOLEAN NOT NULL DEFAULT false,
    "isParentalLeave" BOOLEAN NOT NULL DEFAULT false,
    "isCaregivingLeave" BOOLEAN NOT NULL DEFAULT false,
    "option1" TEXT NOT NULL DEFAULT '',
    "option2" TEXT NOT NULL DEFAULT '',
    "calcFuelCost" INTEGER,
    "calcLaborCost" INTEGER,

    CONSTRAINT "DailyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidLeave" (
    "id" TEXT NOT NULL,
    "fk_companyEmployeeId" TEXT NOT NULL,
    "grantDate" TEXT NOT NULL,
    "grantDay" INTEGER NOT NULL,
    "expirationDate" TEXT NOT NULL,

    CONSTRAINT "PaidLeave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "fk_companyEmployeeId" TEXT,
    "isInProcess" BOOLEAN NOT NULL DEFAULT false,
    "isSettled" BOOLEAN NOT NULL DEFAULT false,
    "advancePaymentDate" TEXT NOT NULL DEFAULT '',
    "advancePaymentAmount" INTEGER,
    "yearMonth" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseDetail" (
    "id" TEXT NOT NULL,
    "fk_expenseId" TEXT NOT NULL,
    "fk_monthlyReportId" TEXT,
    "date" TEXT NOT NULL DEFAULT '',
    "amount" INTEGER,
    "account" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "isCredit" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExpenseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL DEFAULT '1',
    "closingMonth" INTEGER NOT NULL DEFAULT 3,
    "salesTaxRate" TEXT NOT NULL DEFAULT '',
    "allowanceDriving" TEXT NOT NULL DEFAULT '',
    "allowanceBusinessTrip" TEXT NOT NULL DEFAULT '',
    "allowanceNightMeal" TEXT NOT NULL DEFAULT '',
    "fuelRegular" INTEGER,
    "fuelPremium" INTEGER,
    "fuelDiesel" INTEGER,
    "expenseAccount" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dailyReport1" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dailyReport2" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjType1" (
    "id" TEXT NOT NULL DEFAULT '1',
    "A" TEXT NOT NULL DEFAULT '',
    "B" TEXT NOT NULL DEFAULT '',
    "C" TEXT NOT NULL DEFAULT '',
    "D" TEXT NOT NULL DEFAULT '',
    "E" TEXT NOT NULL DEFAULT '',
    "F" TEXT NOT NULL DEFAULT '',
    "G" TEXT NOT NULL DEFAULT '',
    "Z" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProjType1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjType2" (
    "id" TEXT NOT NULL DEFAULT '1',
    "A" TEXT NOT NULL DEFAULT '',
    "B" TEXT NOT NULL DEFAULT '',
    "C" TEXT NOT NULL DEFAULT '',
    "D" TEXT NOT NULL DEFAULT '',
    "E" TEXT NOT NULL DEFAULT '',
    "F" TEXT NOT NULL DEFAULT '',
    "G" TEXT NOT NULL DEFAULT '',
    "Z" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProjType2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectNumber_key" ON "Project"("projectNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_id_key" ON "Daily"("id");

-- AddForeignKey
ALTER TABLE "CompanyBranch" ADD CONSTRAINT "CompanyBranch_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarMaintenance" ADD CONSTRAINT "CarMaintenance_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLicense" ADD CONSTRAINT "EmployeeLicense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchBankAccount" ADD CONSTRAINT "BranchBankAccount_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchPermitNotice" ADD CONSTRAINT "BranchPermitNotice_fk_companyBranchId_fkey" FOREIGN KEY ("fk_companyBranchId") REFERENCES "CompanyBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk_companyId_prime_fkey" FOREIGN KEY ("fk_companyId_prime") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyReport" ADD CONSTRAINT "MonthlyReport_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyReportSub" ADD CONSTRAINT "MonthlyReportSub_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_dailyId_fkey" FOREIGN KEY ("fk_dailyId") REFERENCES "Daily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_paidLeaveId_fkey" FOREIGN KEY ("fk_paidLeaveId") REFERENCES "PaidLeave"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidLeave" ADD CONSTRAINT "PaidLeave_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_expenseId_fkey" FOREIGN KEY ("fk_expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjType1" ADD CONSTRAINT "ProjType1_id_fkey" FOREIGN KEY ("id") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjType2" ADD CONSTRAINT "ProjType2_id_fkey" FOREIGN KEY ("id") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
