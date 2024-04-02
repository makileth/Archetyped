/*
  Warnings:

  - You are about to drop the column `deity` on the `CocCharacter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CocCharacter" DROP COLUMN "deity",
ADD COLUMN     "interests" TEXT,
ADD COLUMN     "religion" TEXT;
