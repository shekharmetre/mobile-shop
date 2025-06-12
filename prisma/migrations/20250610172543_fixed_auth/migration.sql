/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `Order` table. All the data in the column will be lost.
  - Added the required column `authId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentMode";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authId" TEXT NOT NULL;
