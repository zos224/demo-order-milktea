/*
  Warnings:

  - You are about to drop the column `idOrderItem` on the `Topping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_idOrderItem_fkey";

-- AlterTable
ALTER TABLE "Topping" DROP COLUMN "idOrderItem";

-- CreateTable
CREATE TABLE "OrderTopping" (
    "id" SERIAL NOT NULL,
    "idOrderItem" INTEGER NOT NULL,
    "idTopping" INTEGER NOT NULL,

    CONSTRAINT "OrderTopping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderTopping" ADD CONSTRAINT "OrderTopping_idOrderItem_fkey" FOREIGN KEY ("idOrderItem") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTopping" ADD CONSTRAINT "OrderTopping_idTopping_fkey" FOREIGN KEY ("idTopping") REFERENCES "Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
