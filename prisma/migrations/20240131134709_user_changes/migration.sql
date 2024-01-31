/*
  Warnings:

  - You are about to drop the column `onboarded` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "onboarded",
DROP COLUMN "username",
ADD COLUMN     "maxCharacters" INTEGER NOT NULL DEFAULT 6,
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false;
