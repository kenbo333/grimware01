/*
  Warnings:

  - Made the column `bankName` on table `BranchBankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchName` on table `BranchBankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountType` on table `BranchBankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountNumber` on table `BranchBankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `BranchBankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industryType` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `approvingAuthority` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permitType` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permitNumber` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `approvalDate` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiryDate` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `BranchPermitNotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `frameNumber` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuelConsumption` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstRegistration` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `etcNumber` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inspectionStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inspectionEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsCompanyName` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsNumber` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compInsContractorName` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsCompanyName` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsNumber` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsStartDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsEndDate` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsContractorName` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsAgeRequirement` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsPersonal` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsProperty` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsPassenger` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volInsCar` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carNumber` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_fuelTypeId` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuelType` on table `CarFuelType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `CarFuelType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `CarMaintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `odometer` on table `CarMaintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cost` on table `CarMaintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `CarMaintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name_kana` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closingDay` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fax` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name_kana` on table `CompanyBranch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employmentStatus` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDay` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthMonth` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthYear` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloodPressureDown` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloodPressureUp` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entryDate` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `medicalHistory` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `routineCheckupDate` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `routineCheckupHospital` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialCheckupDate` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialCheckupHospital` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearsOfExperience` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloodType` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bloodTypeRh` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calendarName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compEmail` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compMobile` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgAddress1` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgAddress2` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgFirstName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgFirstName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgLastName` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgLastName_kana` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgPhone` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgPostcode` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emgRelation` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employeeNumber` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homePhone` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `persEmail` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `persMobile` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placeOfOrigin` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborCostDayShift` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborCostNightShift` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborCostOvertime` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborCostLateOvertime` on table `CompanyEmployee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyId` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_monthlyReportId` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_car` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startTime` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `breakTime` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `day` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `night` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `overtime` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lateOvertime` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `businessTripAllowance` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nightMealAllowance` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `drivingAllowance` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `etcFees` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `option1` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `option2` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `option3` on table `DailyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `acquisitionDate` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiryDate` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `issuingAuthority` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenseNumber` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileName` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileType` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePath` on table `EmployeeLicense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `advancePaymentDate` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `advancePaymentAmount` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearMonth` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_monthlyReportId` on table `ExpenseDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `ExpenseDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `ExpenseDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account` on table `ExpenseDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `ExpenseDetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoiceDate` on table `MonthlyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentDate1` on table `MonthlyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentDate2` on table `MonthlyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoiceDueDate1` on table `MonthlyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoiceDueDate2` on table `MonthlyReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `SalesTaxRate` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `allowanceDriving` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `allowanceMeal` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `allowanceTravel` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuelDiesel` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuelPremium` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fuelRegular` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborChargeHoliday` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborChargeWeekday` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `markupRateExpense` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `markupRateMaterial` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `markupRateSubcontract` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Made the column `A` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `B` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `C` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `D` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `E` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `F` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `G` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Z` on table `ProjType1` required. This step will fail if there are existing NULL values in that column.
  - Made the column `A` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `B` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `C` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `D` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `E` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `F` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `G` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Z` on table `ProjType2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyBranchId_own` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId_chief` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId_safety` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId_foreman` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name_kana` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortName` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientNumber` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address1` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address2` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectStartDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectEndDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownProjectStartDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownProjectEndDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyBranchId_billing` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyBranchId_prime` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId_prime` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyId` on table `ProjectPurchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_projectId` on table `ProjectPurchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyId` on table `ProjectSub` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_projectId` on table `ProjectSub` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileName` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileType` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePath` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_carId` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_companyEmployeeId` on table `Remark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_projectId` on table `Remark` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_car_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "DailyReport" DROP CONSTRAINT "DailyReport_fk_monthlyReportId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseDetail" DROP CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPurchase" DROP CONSTRAINT "ProjectPurchase_fk_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSub" DROP CONSTRAINT "ProjectSub_fk_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_carId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_companyEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "Remark" DROP CONSTRAINT "Remark_fk_projectId_fkey";

-- AlterTable
ALTER TABLE "BranchBankAccount" ALTER COLUMN "bankName" SET NOT NULL,
ALTER COLUMN "bankName" SET DEFAULT '',
ALTER COLUMN "branchName" SET NOT NULL,
ALTER COLUMN "branchName" SET DEFAULT '',
ALTER COLUMN "accountType" SET NOT NULL,
ALTER COLUMN "accountType" SET DEFAULT '',
ALTER COLUMN "accountNumber" SET NOT NULL,
ALTER COLUMN "accountNumber" SET DEFAULT '',
ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '';

-- AlterTable
ALTER TABLE "BranchPermitNotice" ALTER COLUMN "industryType" SET NOT NULL,
ALTER COLUMN "industryType" SET DEFAULT '',
ALTER COLUMN "approvingAuthority" SET NOT NULL,
ALTER COLUMN "approvingAuthority" SET DEFAULT '',
ALTER COLUMN "permitType" SET NOT NULL,
ALTER COLUMN "permitType" SET DEFAULT '',
ALTER COLUMN "permitNumber" SET NOT NULL,
ALTER COLUMN "permitNumber" SET DEFAULT '',
ALTER COLUMN "approvalDate" SET NOT NULL,
ALTER COLUMN "approvalDate" SET DEFAULT '',
ALTER COLUMN "expiryDate" SET NOT NULL,
ALTER COLUMN "expiryDate" SET DEFAULT '',
ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "frameNumber" SET NOT NULL,
ALTER COLUMN "frameNumber" SET DEFAULT '',
ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "model" SET DEFAULT '',
ALTER COLUMN "fuelConsumption" SET NOT NULL,
ALTER COLUMN "fuelConsumption" SET DEFAULT '',
ALTER COLUMN "firstRegistration" SET NOT NULL,
ALTER COLUMN "firstRegistration" SET DEFAULT '',
ALTER COLUMN "etcNumber" SET NOT NULL,
ALTER COLUMN "etcNumber" SET DEFAULT '',
ALTER COLUMN "inspectionStartDate" SET NOT NULL,
ALTER COLUMN "inspectionStartDate" SET DEFAULT '',
ALTER COLUMN "inspectionEndDate" SET NOT NULL,
ALTER COLUMN "inspectionEndDate" SET DEFAULT '',
ALTER COLUMN "compInsCompanyName" SET NOT NULL,
ALTER COLUMN "compInsCompanyName" SET DEFAULT '',
ALTER COLUMN "compInsNumber" SET NOT NULL,
ALTER COLUMN "compInsNumber" SET DEFAULT '',
ALTER COLUMN "compInsStartDate" SET NOT NULL,
ALTER COLUMN "compInsStartDate" SET DEFAULT '',
ALTER COLUMN "compInsEndDate" SET NOT NULL,
ALTER COLUMN "compInsEndDate" SET DEFAULT '',
ALTER COLUMN "compInsContractorName" SET NOT NULL,
ALTER COLUMN "compInsContractorName" SET DEFAULT '',
ALTER COLUMN "volInsCompanyName" SET NOT NULL,
ALTER COLUMN "volInsCompanyName" SET DEFAULT '',
ALTER COLUMN "volInsNumber" SET NOT NULL,
ALTER COLUMN "volInsNumber" SET DEFAULT '',
ALTER COLUMN "volInsStartDate" SET NOT NULL,
ALTER COLUMN "volInsStartDate" SET DEFAULT '',
ALTER COLUMN "volInsEndDate" SET NOT NULL,
ALTER COLUMN "volInsEndDate" SET DEFAULT '',
ALTER COLUMN "volInsContractorName" SET NOT NULL,
ALTER COLUMN "volInsContractorName" SET DEFAULT '',
ALTER COLUMN "volInsAgeRequirement" SET NOT NULL,
ALTER COLUMN "volInsAgeRequirement" SET DEFAULT '',
ALTER COLUMN "volInsPersonal" SET NOT NULL,
ALTER COLUMN "volInsPersonal" SET DEFAULT '',
ALTER COLUMN "volInsProperty" SET NOT NULL,
ALTER COLUMN "volInsProperty" SET DEFAULT '',
ALTER COLUMN "volInsPassenger" SET NOT NULL,
ALTER COLUMN "volInsPassenger" SET DEFAULT '',
ALTER COLUMN "volInsCar" SET NOT NULL,
ALTER COLUMN "volInsCar" SET DEFAULT '',
ALTER COLUMN "carNumber" SET NOT NULL,
ALTER COLUMN "carNumber" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "fk_fuelTypeId" SET NOT NULL,
ALTER COLUMN "fk_fuelTypeId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CarFuelType" ALTER COLUMN "fuelType" SET NOT NULL,
ALTER COLUMN "fuelType" SET DEFAULT '',
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CarMaintenance" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT '',
ALTER COLUMN "odometer" SET NOT NULL,
ALTER COLUMN "odometer" SET DEFAULT '',
ALTER COLUMN "cost" SET NOT NULL,
ALTER COLUMN "cost" SET DEFAULT '',
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "firstName_kana" SET NOT NULL,
ALTER COLUMN "firstName_kana" SET DEFAULT '',
ALTER COLUMN "lastName_kana" SET NOT NULL,
ALTER COLUMN "lastName_kana" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "name_kana" SET NOT NULL,
ALTER COLUMN "name_kana" SET DEFAULT '',
ALTER COLUMN "closingDay" SET NOT NULL,
ALTER COLUMN "closingDay" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyBranch" ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address1" SET DEFAULT '',
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "fax" SET NOT NULL,
ALTER COLUMN "fax" SET DEFAULT '',
ALTER COLUMN "postcode" SET NOT NULL,
ALTER COLUMN "postcode" SET DEFAULT '',
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "tel" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "name_kana" SET NOT NULL,
ALTER COLUMN "name_kana" SET DEFAULT '';

-- AlterTable
ALTER TABLE "CompanyEmployee" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address1" SET DEFAULT '',
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '',
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department" SET DEFAULT '',
ALTER COLUMN "employmentStatus" SET NOT NULL,
ALTER COLUMN "employmentStatus" SET DEFAULT '',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT '',
ALTER COLUMN "postcode" SET NOT NULL,
ALTER COLUMN "postcode" SET DEFAULT '',
ALTER COLUMN "firstName_kana" SET NOT NULL,
ALTER COLUMN "firstName_kana" SET DEFAULT '',
ALTER COLUMN "lastName_kana" SET NOT NULL,
ALTER COLUMN "lastName_kana" SET DEFAULT '',
ALTER COLUMN "birthDay" SET NOT NULL,
ALTER COLUMN "birthDay" SET DEFAULT '',
ALTER COLUMN "birthMonth" SET NOT NULL,
ALTER COLUMN "birthMonth" SET DEFAULT '',
ALTER COLUMN "birthYear" SET NOT NULL,
ALTER COLUMN "birthYear" SET DEFAULT '',
ALTER COLUMN "bloodPressureDown" SET NOT NULL,
ALTER COLUMN "bloodPressureDown" SET DEFAULT '',
ALTER COLUMN "bloodPressureUp" SET NOT NULL,
ALTER COLUMN "bloodPressureUp" SET DEFAULT '',
ALTER COLUMN "entryDate" SET NOT NULL,
ALTER COLUMN "entryDate" SET DEFAULT '',
ALTER COLUMN "medicalHistory" SET NOT NULL,
ALTER COLUMN "medicalHistory" SET DEFAULT '',
ALTER COLUMN "routineCheckupDate" SET NOT NULL,
ALTER COLUMN "routineCheckupDate" SET DEFAULT '',
ALTER COLUMN "routineCheckupHospital" SET NOT NULL,
ALTER COLUMN "routineCheckupHospital" SET DEFAULT '',
ALTER COLUMN "specialCheckupDate" SET NOT NULL,
ALTER COLUMN "specialCheckupDate" SET DEFAULT '',
ALTER COLUMN "specialCheckupHospital" SET NOT NULL,
ALTER COLUMN "specialCheckupHospital" SET DEFAULT '',
ALTER COLUMN "yearsOfExperience" SET NOT NULL,
ALTER COLUMN "yearsOfExperience" SET DEFAULT '',
ALTER COLUMN "bloodType" SET NOT NULL,
ALTER COLUMN "bloodType" SET DEFAULT '',
ALTER COLUMN "bloodTypeRh" SET NOT NULL,
ALTER COLUMN "bloodTypeRh" SET DEFAULT '',
ALTER COLUMN "calendarName" SET NOT NULL,
ALTER COLUMN "calendarName" SET DEFAULT '',
ALTER COLUMN "compEmail" SET NOT NULL,
ALTER COLUMN "compEmail" SET DEFAULT '',
ALTER COLUMN "compMobile" SET NOT NULL,
ALTER COLUMN "compMobile" SET DEFAULT '',
ALTER COLUMN "emgAddress1" SET NOT NULL,
ALTER COLUMN "emgAddress1" SET DEFAULT '',
ALTER COLUMN "emgAddress2" SET NOT NULL,
ALTER COLUMN "emgAddress2" SET DEFAULT '',
ALTER COLUMN "emgFirstName" SET NOT NULL,
ALTER COLUMN "emgFirstName" SET DEFAULT '',
ALTER COLUMN "emgFirstName_kana" SET NOT NULL,
ALTER COLUMN "emgFirstName_kana" SET DEFAULT '',
ALTER COLUMN "emgLastName" SET NOT NULL,
ALTER COLUMN "emgLastName" SET DEFAULT '',
ALTER COLUMN "emgLastName_kana" SET NOT NULL,
ALTER COLUMN "emgLastName_kana" SET DEFAULT '',
ALTER COLUMN "emgPhone" SET NOT NULL,
ALTER COLUMN "emgPhone" SET DEFAULT '',
ALTER COLUMN "emgPostcode" SET NOT NULL,
ALTER COLUMN "emgPostcode" SET DEFAULT '',
ALTER COLUMN "emgRelation" SET NOT NULL,
ALTER COLUMN "emgRelation" SET DEFAULT '',
ALTER COLUMN "employeeNumber" SET NOT NULL,
ALTER COLUMN "employeeNumber" SET DEFAULT '',
ALTER COLUMN "homePhone" SET NOT NULL,
ALTER COLUMN "homePhone" SET DEFAULT '',
ALTER COLUMN "persEmail" SET NOT NULL,
ALTER COLUMN "persEmail" SET DEFAULT '',
ALTER COLUMN "persMobile" SET NOT NULL,
ALTER COLUMN "persMobile" SET DEFAULT '',
ALTER COLUMN "placeOfOrigin" SET NOT NULL,
ALTER COLUMN "placeOfOrigin" SET DEFAULT '',
ALTER COLUMN "laborCostDayShift" SET NOT NULL,
ALTER COLUMN "laborCostDayShift" SET DEFAULT '',
ALTER COLUMN "laborCostNightShift" SET NOT NULL,
ALTER COLUMN "laborCostNightShift" SET DEFAULT '',
ALTER COLUMN "laborCostOvertime" SET NOT NULL,
ALTER COLUMN "laborCostOvertime" SET DEFAULT '',
ALTER COLUMN "laborCostLateOvertime" SET NOT NULL,
ALTER COLUMN "laborCostLateOvertime" SET DEFAULT '';

-- AlterTable
ALTER TABLE "DailyReport" ALTER COLUMN "fk_companyId" SET NOT NULL,
ALTER COLUMN "fk_companyId" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" SET DEFAULT '',
ALTER COLUMN "fk_monthlyReportId" SET NOT NULL,
ALTER COLUMN "fk_monthlyReportId" SET DEFAULT '',
ALTER COLUMN "fk_car" SET NOT NULL,
ALTER COLUMN "fk_car" SET DEFAULT '',
ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "startTime" SET DEFAULT '',
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "endTime" SET DEFAULT '',
ALTER COLUMN "breakTime" SET NOT NULL,
ALTER COLUMN "breakTime" SET DEFAULT '',
ALTER COLUMN "day" SET NOT NULL,
ALTER COLUMN "day" SET DEFAULT '',
ALTER COLUMN "night" SET NOT NULL,
ALTER COLUMN "night" SET DEFAULT '',
ALTER COLUMN "overtime" SET NOT NULL,
ALTER COLUMN "overtime" SET DEFAULT '',
ALTER COLUMN "lateOvertime" SET NOT NULL,
ALTER COLUMN "lateOvertime" SET DEFAULT '',
ALTER COLUMN "businessTripAllowance" SET NOT NULL,
ALTER COLUMN "businessTripAllowance" SET DEFAULT '',
ALTER COLUMN "nightMealAllowance" SET NOT NULL,
ALTER COLUMN "nightMealAllowance" SET DEFAULT '',
ALTER COLUMN "drivingAllowance" SET NOT NULL,
ALTER COLUMN "drivingAllowance" SET DEFAULT '',
ALTER COLUMN "etcFees" SET NOT NULL,
ALTER COLUMN "etcFees" SET DEFAULT '',
ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "distance" SET DEFAULT '',
ALTER COLUMN "option1" SET NOT NULL,
ALTER COLUMN "option1" SET DEFAULT '',
ALTER COLUMN "option2" SET NOT NULL,
ALTER COLUMN "option2" SET DEFAULT '',
ALTER COLUMN "option3" SET NOT NULL,
ALTER COLUMN "option3" SET DEFAULT '';

-- AlterTable
ALTER TABLE "EmployeeLicense" ALTER COLUMN "acquisitionDate" SET NOT NULL,
ALTER COLUMN "acquisitionDate" SET DEFAULT '',
ALTER COLUMN "expiryDate" SET NOT NULL,
ALTER COLUMN "expiryDate" SET DEFAULT '',
ALTER COLUMN "issuingAuthority" SET NOT NULL,
ALTER COLUMN "issuingAuthority" SET DEFAULT '',
ALTER COLUMN "licenseNumber" SET NOT NULL,
ALTER COLUMN "licenseNumber" SET DEFAULT '',
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT '',
ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '',
ALTER COLUMN "fileName" SET NOT NULL,
ALTER COLUMN "fileName" SET DEFAULT '',
ALTER COLUMN "fileType" SET NOT NULL,
ALTER COLUMN "fileType" SET DEFAULT '',
ALTER COLUMN "filePath" SET NOT NULL,
ALTER COLUMN "filePath" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "fk_companyEmployeeId" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" SET DEFAULT '',
ALTER COLUMN "advancePaymentDate" SET NOT NULL,
ALTER COLUMN "advancePaymentDate" SET DEFAULT '',
ALTER COLUMN "advancePaymentAmount" SET NOT NULL,
ALTER COLUMN "advancePaymentAmount" SET DEFAULT '',
ALTER COLUMN "yearMonth" SET NOT NULL,
ALTER COLUMN "yearMonth" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ExpenseDetail" ALTER COLUMN "fk_monthlyReportId" SET NOT NULL,
ALTER COLUMN "fk_monthlyReportId" SET DEFAULT '',
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT '',
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DEFAULT '',
ALTER COLUMN "account" SET NOT NULL,
ALTER COLUMN "account" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "MonthlyReport" ALTER COLUMN "invoiceDate" SET NOT NULL,
ALTER COLUMN "invoiceDate" SET DEFAULT '',
ALTER COLUMN "paymentDate1" SET NOT NULL,
ALTER COLUMN "paymentDate1" SET DEFAULT '',
ALTER COLUMN "paymentDate2" SET NOT NULL,
ALTER COLUMN "paymentDate2" SET DEFAULT '',
ALTER COLUMN "invoiceDueDate1" SET NOT NULL,
ALTER COLUMN "invoiceDueDate1" SET DEFAULT '',
ALTER COLUMN "invoiceDueDate2" SET NOT NULL,
ALTER COLUMN "invoiceDueDate2" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "SalesTaxRate" SET NOT NULL,
ALTER COLUMN "SalesTaxRate" SET DEFAULT '',
ALTER COLUMN "allowanceDriving" SET NOT NULL,
ALTER COLUMN "allowanceDriving" SET DEFAULT '',
ALTER COLUMN "allowanceMeal" SET NOT NULL,
ALTER COLUMN "allowanceMeal" SET DEFAULT '',
ALTER COLUMN "allowanceTravel" SET NOT NULL,
ALTER COLUMN "allowanceTravel" SET DEFAULT '',
ALTER COLUMN "fuelDiesel" SET NOT NULL,
ALTER COLUMN "fuelDiesel" SET DEFAULT '',
ALTER COLUMN "fuelPremium" SET NOT NULL,
ALTER COLUMN "fuelPremium" SET DEFAULT '',
ALTER COLUMN "fuelRegular" SET NOT NULL,
ALTER COLUMN "fuelRegular" SET DEFAULT '',
ALTER COLUMN "laborChargeHoliday" SET NOT NULL,
ALTER COLUMN "laborChargeHoliday" SET DEFAULT '',
ALTER COLUMN "laborChargeWeekday" SET NOT NULL,
ALTER COLUMN "laborChargeWeekday" SET DEFAULT '',
ALTER COLUMN "markupRateExpense" SET NOT NULL,
ALTER COLUMN "markupRateExpense" SET DEFAULT '',
ALTER COLUMN "markupRateMaterial" SET NOT NULL,
ALTER COLUMN "markupRateMaterial" SET DEFAULT '',
ALTER COLUMN "markupRateSubcontract" SET NOT NULL,
ALTER COLUMN "markupRateSubcontract" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProjType1" ALTER COLUMN "A" SET NOT NULL,
ALTER COLUMN "A" SET DEFAULT '',
ALTER COLUMN "B" SET NOT NULL,
ALTER COLUMN "B" SET DEFAULT '',
ALTER COLUMN "C" SET NOT NULL,
ALTER COLUMN "C" SET DEFAULT '',
ALTER COLUMN "D" SET NOT NULL,
ALTER COLUMN "D" SET DEFAULT '',
ALTER COLUMN "E" SET NOT NULL,
ALTER COLUMN "E" SET DEFAULT '',
ALTER COLUMN "F" SET NOT NULL,
ALTER COLUMN "F" SET DEFAULT '',
ALTER COLUMN "G" SET NOT NULL,
ALTER COLUMN "G" SET DEFAULT '',
ALTER COLUMN "Z" SET NOT NULL,
ALTER COLUMN "Z" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProjType2" ALTER COLUMN "A" SET NOT NULL,
ALTER COLUMN "A" SET DEFAULT '',
ALTER COLUMN "B" SET NOT NULL,
ALTER COLUMN "B" SET DEFAULT '',
ALTER COLUMN "C" SET NOT NULL,
ALTER COLUMN "C" SET DEFAULT '',
ALTER COLUMN "D" SET NOT NULL,
ALTER COLUMN "D" SET DEFAULT '',
ALTER COLUMN "E" SET NOT NULL,
ALTER COLUMN "E" SET DEFAULT '',
ALTER COLUMN "F" SET NOT NULL,
ALTER COLUMN "F" SET DEFAULT '',
ALTER COLUMN "G" SET NOT NULL,
ALTER COLUMN "G" SET DEFAULT '',
ALTER COLUMN "Z" SET NOT NULL,
ALTER COLUMN "Z" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "fk_companyBranchId_own" SET NOT NULL,
ALTER COLUMN "fk_companyBranchId_own" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId_chief" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId_chief" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId_safety" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId_safety" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId_foreman" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId_foreman" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "name_kana" SET NOT NULL,
ALTER COLUMN "name_kana" SET DEFAULT '',
ALTER COLUMN "shortName" SET NOT NULL,
ALTER COLUMN "shortName" SET DEFAULT '',
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT '',
ALTER COLUMN "clientNumber" SET NOT NULL,
ALTER COLUMN "clientNumber" SET DEFAULT '',
ALTER COLUMN "postcode" SET NOT NULL,
ALTER COLUMN "postcode" SET DEFAULT '',
ALTER COLUMN "address1" SET NOT NULL,
ALTER COLUMN "address1" SET DEFAULT '',
ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT '',
ALTER COLUMN "distance" SET NOT NULL,
ALTER COLUMN "distance" SET DEFAULT '',
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "tel" SET DEFAULT '',
ALTER COLUMN "projectStartDate" SET NOT NULL,
ALTER COLUMN "projectStartDate" SET DEFAULT '',
ALTER COLUMN "projectEndDate" SET NOT NULL,
ALTER COLUMN "projectEndDate" SET DEFAULT '',
ALTER COLUMN "ownProjectStartDate" SET NOT NULL,
ALTER COLUMN "ownProjectStartDate" SET DEFAULT '',
ALTER COLUMN "ownProjectEndDate" SET NOT NULL,
ALTER COLUMN "ownProjectEndDate" SET DEFAULT '',
ALTER COLUMN "fk_companyBranchId_billing" SET NOT NULL,
ALTER COLUMN "fk_companyBranchId_billing" SET DEFAULT '',
ALTER COLUMN "fk_companyBranchId_prime" SET NOT NULL,
ALTER COLUMN "fk_companyBranchId_prime" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId_prime" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId_prime" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProjectPurchase" ALTER COLUMN "fk_companyId" SET NOT NULL,
ALTER COLUMN "fk_companyId" SET DEFAULT '',
ALTER COLUMN "fk_projectId" SET NOT NULL,
ALTER COLUMN "fk_projectId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProjectSub" ALTER COLUMN "fk_companyId" SET NOT NULL,
ALTER COLUMN "fk_companyId" SET DEFAULT '',
ALTER COLUMN "fk_projectId" SET NOT NULL,
ALTER COLUMN "fk_projectId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Remark" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT '',
ALTER COLUMN "fileName" SET NOT NULL,
ALTER COLUMN "fileName" SET DEFAULT '',
ALTER COLUMN "remark" SET NOT NULL,
ALTER COLUMN "remark" SET DEFAULT '',
ALTER COLUMN "fileType" SET NOT NULL,
ALTER COLUMN "fileType" SET DEFAULT '',
ALTER COLUMN "filePath" SET NOT NULL,
ALTER COLUMN "filePath" SET DEFAULT '',
ALTER COLUMN "fk_carId" SET NOT NULL,
ALTER COLUMN "fk_carId" SET DEFAULT '',
ALTER COLUMN "fk_companyEmployeeId" SET NOT NULL,
ALTER COLUMN "fk_companyEmployeeId" SET DEFAULT '',
ALTER COLUMN "fk_projectId" SET NOT NULL,
ALTER COLUMN "fk_projectId" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_carId_fkey" FOREIGN KEY ("fk_carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remark" ADD CONSTRAINT "Remark_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPurchase" ADD CONSTRAINT "ProjectPurchase_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_projectId_fkey" FOREIGN KEY ("fk_projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSub" ADD CONSTRAINT "ProjectSub_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyId_fkey" FOREIGN KEY ("fk_companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyReport" ADD CONSTRAINT "DailyReport_fk_car_fkey" FOREIGN KEY ("fk_car") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_fk_companyEmployeeId_fkey" FOREIGN KEY ("fk_companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseDetail" ADD CONSTRAINT "ExpenseDetail_fk_monthlyReportId_fkey" FOREIGN KEY ("fk_monthlyReportId") REFERENCES "MonthlyReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
