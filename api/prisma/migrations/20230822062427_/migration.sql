-- CreateTable
CREATE TABLE "CarMaintenance" (
    "id" TEXT NOT NULL,
    "fk_car" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "odometer" TEXT NOT NULL DEFAULT '',
    "cost" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CarMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarFuelType" (
    "id" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CarFuelType_pkey" PRIMARY KEY ("id")
);
