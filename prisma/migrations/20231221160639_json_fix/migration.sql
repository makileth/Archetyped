/*
  Warnings:

  - The `traits` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `flaws` column on the `Character` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "traits",
ADD COLUMN     "traits" JSONB[],
DROP COLUMN "flaws",
ADD COLUMN     "flaws" JSONB[];
