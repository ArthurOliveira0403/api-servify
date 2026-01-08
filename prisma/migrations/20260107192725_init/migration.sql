/*
  Warnings:

  - You are about to drop the column `internationalId` on the `client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[international_id]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `international_id` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "client_internationalId_key";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "internationalId",
ADD COLUMN     "international_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "client_international_id_key" ON "client"("international_id");
