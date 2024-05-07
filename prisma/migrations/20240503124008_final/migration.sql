-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_unitId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_courseId_fkey";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "question" VARCHAR(3000) NOT NULL,
    "answer" VARCHAR(3000) NOT NULL,
    "options" VARCHAR(3000) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chapterId" ON "Question"("chapterId");

-- CreateIndex
CREATE INDEX "userEmailIndex" ON "User"("email");

-- RenameIndex
ALTER INDEX "Account_userId_index" RENAME TO "accountUserIdIndex";

-- RenameIndex
ALTER INDEX "Chapter_unitId_index" RENAME TO "unitId";

-- RenameIndex
ALTER INDEX "Session_userId_index" RENAME TO "sessionUserIdIndex";

-- RenameIndex
ALTER INDEX "Unit_courseId_index" RENAME TO "courseId";
