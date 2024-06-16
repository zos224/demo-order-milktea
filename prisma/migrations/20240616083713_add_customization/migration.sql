-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "thanks" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "OtherCustomization" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "OtherCustomization_pkey" PRIMARY KEY ("id")
);
