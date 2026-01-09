/*
  Warnings:

  - You are about to drop the column `email` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `client` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `client_company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "client_email_key";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "email",
DROP COLUMN "phone_number",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "client_company" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
