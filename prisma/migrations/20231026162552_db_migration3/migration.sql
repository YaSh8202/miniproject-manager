/*
  Warnings:

  - A unique constraint covering the columns `[year,departmentId]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entryNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryNo` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "entryNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Batch_year_departmentId_key" ON "Batch"("year", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_entryNo_key" ON "Student"("entryNo");
