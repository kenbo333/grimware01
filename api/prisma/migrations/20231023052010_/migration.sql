/*
  Warnings:

  - You are about to drop the column `projType1A` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1B` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1C` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1D` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1E` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1F` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1G` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType1Z` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2A` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2B` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2C` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2D` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2E` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2F` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2G` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `projType2Z` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "projType1A",
DROP COLUMN "projType1B",
DROP COLUMN "projType1C",
DROP COLUMN "projType1D",
DROP COLUMN "projType1E",
DROP COLUMN "projType1F",
DROP COLUMN "projType1G",
DROP COLUMN "projType1Z",
DROP COLUMN "projType2A",
DROP COLUMN "projType2B",
DROP COLUMN "projType2C",
DROP COLUMN "projType2D",
DROP COLUMN "projType2E",
DROP COLUMN "projType2F",
DROP COLUMN "projType2G",
DROP COLUMN "projType2Z";

-- CreateTable
CREATE TABLE "ProjType1" (
    "id" TEXT NOT NULL,
    "typeA" TEXT NOT NULL DEFAULT '',
    "typeB" TEXT NOT NULL DEFAULT '',
    "typeC" TEXT NOT NULL DEFAULT '',
    "typeD" TEXT NOT NULL DEFAULT '',
    "typeE" TEXT NOT NULL DEFAULT '',
    "typeF" TEXT NOT NULL DEFAULT '',
    "typeG" TEXT NOT NULL DEFAULT '',
    "typeZ" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProjType1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjType2" (
    "id" TEXT NOT NULL,
    "typeA" TEXT NOT NULL DEFAULT '',
    "typeB" TEXT NOT NULL DEFAULT '',
    "typeC" TEXT NOT NULL DEFAULT '',
    "typeD" TEXT NOT NULL DEFAULT '',
    "typeE" TEXT NOT NULL DEFAULT '',
    "typeF" TEXT NOT NULL DEFAULT '',
    "typeG" TEXT NOT NULL DEFAULT '',
    "typeZ" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ProjType2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjType1" ADD CONSTRAINT "ProjType1_id_fkey" FOREIGN KEY ("id") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjType2" ADD CONSTRAINT "ProjType2_id_fkey" FOREIGN KEY ("id") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
