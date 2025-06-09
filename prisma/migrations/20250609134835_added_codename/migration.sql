/*
  Warnings:

  - Added the required column `codename` to the `Gadget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gadget" ADD COLUMN     "codename" TEXT NOT NULL;
