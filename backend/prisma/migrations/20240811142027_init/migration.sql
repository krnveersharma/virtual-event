/*
  Warnings:

  - Added the required column `organiser` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organiserId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participants` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organiser" TEXT NOT NULL,
ADD COLUMN     "organiserId" TEXT NOT NULL,
ADD COLUMN     "participants" INTEGER NOT NULL;
