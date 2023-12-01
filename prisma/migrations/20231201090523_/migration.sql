/*
  Warnings:

  - You are about to drop the `MentorRanking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MentorRanking" DROP CONSTRAINT "MentorRanking_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "MentorRanking" DROP CONSTRAINT "MentorRanking_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "mentorList" TEXT[];

-- DropTable
DROP TABLE "MentorRanking";
