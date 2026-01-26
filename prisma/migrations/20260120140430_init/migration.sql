/*
  Warnings:

  - You are about to drop the column `client_International_id` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `executedAt` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `client_international_id` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executed_at` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "client_International_id",
DROP COLUMN "executedAt",
ADD COLUMN     "client_international_id" TEXT NOT NULL,
ADD COLUMN     "executed_at" TIMESTAMP(3) NOT NULL;
