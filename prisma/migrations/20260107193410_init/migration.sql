/*
  Warnings:

  - You are about to drop the column `createAt` on the `client_company` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `client_company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client_company" DROP COLUMN "createAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
