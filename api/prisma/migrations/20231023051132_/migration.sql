-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "projType1A" TEXT NOT NULL DEFAULT '',
    "projType1B" TEXT NOT NULL DEFAULT '',
    "projType1C" TEXT NOT NULL DEFAULT '',
    "projType1D" TEXT NOT NULL DEFAULT '',
    "projType1E" TEXT NOT NULL DEFAULT '',
    "projType1F" TEXT NOT NULL DEFAULT '',
    "projType1G" TEXT NOT NULL DEFAULT '',
    "projType1Z" TEXT NOT NULL DEFAULT '',
    "projType2A" TEXT NOT NULL DEFAULT '',
    "projType2B" TEXT NOT NULL DEFAULT '',
    "projType2C" TEXT NOT NULL DEFAULT '',
    "projType2D" TEXT NOT NULL DEFAULT '',
    "projType2E" TEXT NOT NULL DEFAULT '',
    "projType2F" TEXT NOT NULL DEFAULT '',
    "projType2G" TEXT NOT NULL DEFAULT '',
    "projType2Z" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);
