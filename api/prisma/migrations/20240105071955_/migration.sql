-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "SalesTaxRate" TEXT,
ADD COLUMN     "allowanceDriving" TEXT,
ADD COLUMN     "allowanceMeal" TEXT,
ADD COLUMN     "allowanceTravel" TEXT,
ADD COLUMN     "fuelDiesel" TEXT,
ADD COLUMN     "fuelPremium" TEXT,
ADD COLUMN     "fuelRegular" TEXT,
ADD COLUMN     "laborChargeHoliday" TEXT,
ADD COLUMN     "laborChargeWeekday" TEXT,
ADD COLUMN     "markupRateExpense" TEXT,
ADD COLUMN     "markupRateMaterial" TEXT,
ADD COLUMN     "markupRateSubcontract" TEXT;

-- CreateTable
CREATE TABLE "ExpenseAccount" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL DEFAULT '1',
    "name" TEXT NOT NULL,

    CONSTRAINT "ExpenseAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseAccount" ADD CONSTRAINT "ExpenseAccount_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
