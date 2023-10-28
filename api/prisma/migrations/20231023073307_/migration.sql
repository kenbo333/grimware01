/*
  Warnings:

  - You are about to drop the column `typeA` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeB` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeC` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeD` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeE` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeF` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeG` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeZ` on the `ProjType1` table. All the data in the column will be lost.
  - You are about to drop the column `typeA` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeB` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeC` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeD` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeE` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeF` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeG` on the `ProjType2` table. All the data in the column will be lost.
  - You are about to drop the column `typeZ` on the `ProjType2` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjType1" DROP COLUMN "typeA",
DROP COLUMN "typeB",
DROP COLUMN "typeC",
DROP COLUMN "typeD",
DROP COLUMN "typeE",
DROP COLUMN "typeF",
DROP COLUMN "typeG",
DROP COLUMN "typeZ",
ADD COLUMN     "A" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "B" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "C" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "D" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "E" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "F" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "G" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "Z" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProjType2" DROP COLUMN "typeA",
DROP COLUMN "typeB",
DROP COLUMN "typeC",
DROP COLUMN "typeD",
DROP COLUMN "typeE",
DROP COLUMN "typeF",
DROP COLUMN "typeG",
DROP COLUMN "typeZ",
ADD COLUMN     "A" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "B" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "C" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "D" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "E" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "F" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "G" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "Z" TEXT NOT NULL DEFAULT '';
