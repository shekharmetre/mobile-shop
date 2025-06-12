/*
  Warnings:

  - A unique constraint covering the columns `[orderKey]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderKey` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderKey_key" ON "Order"("orderKey");
