/*
  Warnings:

  - Added the required column `service_id` to the `sevice_execution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sevice_execution" ADD COLUMN     "service_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "client_company" ADD CONSTRAINT "client_company_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sevice_execution" ADD CONSTRAINT "sevice_execution_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sevice_execution" ADD CONSTRAINT "sevice_execution_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sevice_execution" ADD CONSTRAINT "sevice_execution_clien_company_id_fkey" FOREIGN KEY ("clien_company_id") REFERENCES "client_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
