-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "concept" TEXT NOT NULL,
    "traits" TEXT NOT NULL,
    "heightWeightAge" TEXT NOT NULL,
    "backstory" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "ideals" TEXT NOT NULL,
    "bonds" TEXT NOT NULL,
    "flaws" TEXT NOT NULL,
    "reasonToJoin" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "playerPCs" TEXT NOT NULL,
    "Organisations" TEXT NOT NULL,
    "motherland" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
