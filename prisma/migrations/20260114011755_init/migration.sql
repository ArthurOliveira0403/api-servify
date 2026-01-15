/*
  Warnings:

  - You are about to drop the `sevice_execution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sevice_execution" DROP CONSTRAINT "sevice_execution_client_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sevice_execution" DROP CONSTRAINT "sevice_execution_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sevice_execution" DROP CONSTRAINT "sevice_execution_service_id_fkey";

-- DropTable
DROP TABLE "sevice_execution";

-- CreateTable
CREATE TABLE "service_execution" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "client_company_id" TEXT NOT NULL,
    "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "status" "ServiceExecutionStatus" NOT NULL,

    CONSTRAINT "service_execution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_execution" ADD CONSTRAINT "service_execution_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_execution" ADD CONSTRAINT "service_execution_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_execution" ADD CONSTRAINT "service_execution_client_company_id_fkey" FOREIGN KEY ("client_company_id") REFERENCES "client_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
