-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "fk_fuelType" TEXT NOT NULL DEFAULT '',
    "f_status" BOOLEAN NOT NULL DEFAULT true,
    "carName" TEXT NOT NULL DEFAULT '',
    "frameNumber" TEXT NOT NULL DEFAULT '',
    "model" TEXT NOT NULL DEFAULT '',
    "fuelConsumption" TEXT NOT NULL DEFAULT '',
    "carNumbar" TEXT NOT NULL DEFAULT '',
    "firstRegistration" TEXT NOT NULL DEFAULT '',
    "etcNumber" TEXT NOT NULL DEFAULT '',
    "inspectionStartDate" TIMESTAMP(3),
    "inspectionEndDate" TIMESTAMP(3),
    "compInsCompanyName" TEXT NOT NULL DEFAULT '',
    "compInsNumber" TEXT NOT NULL DEFAULT '',
    "compInsStartDate" TIMESTAMP(3),
    "compInsEndDate" TIMESTAMP(3),
    "compInsContractorName" TEXT NOT NULL DEFAULT '',
    "volInsCompanyName" TEXT NOT NULL DEFAULT '',
    "volInsNumber" TEXT NOT NULL DEFAULT '',
    "volInsStartDate" TIMESTAMP(3),
    "volInsEndDate" TIMESTAMP(3),
    "volInsContractorName" TEXT NOT NULL DEFAULT '',
    "volInsAgeRequirement" TEXT NOT NULL DEFAULT '',
    "volInsPersonal" TEXT NOT NULL DEFAULT '',
    "volInsProperty" TEXT NOT NULL DEFAULT '',
    "volInsPassenger" TEXT NOT NULL DEFAULT '',
    "volInsCar" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
