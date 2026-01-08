/*
  Warnings:

  - You are about to drop the column `clien_company_id` on the `sevice_execution` table. All the data in the column will be lost.
  - Added the required column `client_company_id` to the `sevice_execution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sevice_execution" DROP CONSTRAINT "sevice_execution_clien_company_id_fkey";

-- AlterTable
ALTER TABLE "sevice_execution" DROP COLUMN "clien_company_id",
ADD COLUMN     "client_company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sevice_execution" ADD CONSTRAINT "sevice_execution_client_company_id_fkey" FOREIGN KEY ("client_company_id") REFERENCES "client_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
