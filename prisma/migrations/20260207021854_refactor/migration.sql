/*
  Warnings:

  - Added the required column `updated_at` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `service_execution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "service_execution" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
