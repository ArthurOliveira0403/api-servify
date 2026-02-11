/*
  Warnings:

  - The values [CANCELED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `auto_renew` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('ACTIVE', 'EXPIRED');
ALTER TABLE "subscription" ALTER COLUMN "status" TYPE "SubscriptionStatus_new" USING ("status"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "auto_renew" BOOLEAN NOT NULL;
