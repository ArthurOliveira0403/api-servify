/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cnpj` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cnpj" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");
