-- AlterTable
ALTER TABLE "MiniProject" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "projectDesc" TEXT,
ADD COLUMN     "projectTitle" TEXT;
