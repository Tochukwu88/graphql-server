/*
  Warnings:

  - Added the required column `deleted` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "deleted" BOOLEAN NOT NULL;
