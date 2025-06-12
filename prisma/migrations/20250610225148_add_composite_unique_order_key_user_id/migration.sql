/*
  Warnings:

  - A unique constraint covering the columns `[orderKey,userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_orderKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderKey_userId_key" ON "Order"("orderKey", "userId");
