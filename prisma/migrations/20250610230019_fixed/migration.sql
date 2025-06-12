/*
  Warnings:

  - Made the column `orderKey` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderKey" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Order_orderKey_idx" ON "Order"("orderKey");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
