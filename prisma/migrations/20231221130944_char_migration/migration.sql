/*
  Warnings:

  - You are about to drop the column `Organisations` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `bonds` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `heightWeightAge` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `ideals` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Character` table. All the data in the column will be lost.
  - The `traits` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `flaws` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `authorEmail` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "Organisations",
DROP COLUMN "bonds",
DROP COLUMN "heightWeightAge",
DROP COLUMN "ideals",
DROP COLUMN "image",
ADD COLUMN     "NPCs" TEXT,
ADD COLUMN     "age" TEXT,
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "catchphrase" TEXT,
ADD COLUMN     "conflict" TEXT,
ADD COLUMN     "deity" TEXT,
ADD COLUMN     "fears" TEXT,
ADD COLUMN     "habitsquirks" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "organisations" TEXT,
ADD COLUMN     "race" TEXT,
ADD COLUMN     "secret" TEXT,
ADD COLUMN     "voice" TEXT,
ADD COLUMN     "weight" TEXT,
ALTER COLUMN "characterName" DROP NOT NULL,
ALTER COLUMN "concept" DROP NOT NULL,
DROP COLUMN "traits",
ADD COLUMN     "traits" JSONB,
ALTER COLUMN "backstory" DROP NOT NULL,
ALTER COLUMN "motivation" DROP NOT NULL,
DROP COLUMN "flaws",
ADD COLUMN     "flaws" JSONB,
ALTER COLUMN "reasonToJoin" DROP NOT NULL,
ALTER COLUMN "family" DROP NOT NULL,
ALTER COLUMN "playerPCs" DROP NOT NULL;
