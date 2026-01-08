/*
  Warnings:

  - You are about to drop the column `cpf` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `finished_at` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[internationalId]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `internationalId` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceExecutionStatus" AS ENUM ('PENDING', 'DONE', 'CANCELED');

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_client_id_fkey";

-- DropIndex
DROP INDEX "client_cpf_key";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "cpf",
ADD COLUMN     "internationalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "client_id",
DROP COLUMN "finished_at",
DROP COLUMN "price",
DROP COLUMN "start_at",
DROP COLUMN "status",
ADD COLUMN     "base_price" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ServiceStatus";

-- CreateTable
CREATE TABLE "client_company" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sevice_execution" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "clien_company_id" TEXT NOT NULL,
    "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "status" "ServiceExecutionStatus" NOT NULL,

    CONSTRAINT "sevice_execution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_internationalId_key" ON "client"("internationalId");

-- AddForeignKey
ALTER TABLE "client_company" ADD CONSTRAINT "client_company_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
