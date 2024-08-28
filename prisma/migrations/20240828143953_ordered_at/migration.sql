-- DropIndex
DROP INDEX "CartItem_userId_itemId_key" CASCADE;

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "orderedAt" TIMESTAMP(3);
