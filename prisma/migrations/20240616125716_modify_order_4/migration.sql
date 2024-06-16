/*
  Warnings:

  - You are about to drop the column `note` on the `OrderTopping` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "note" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "OrderTopping" DROP COLUMN "note";
