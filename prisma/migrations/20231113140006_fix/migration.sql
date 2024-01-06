-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_authorId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "authorId" DROP DEFAULT;
