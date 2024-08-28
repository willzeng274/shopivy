/*
  Warnings:

  - You are about to drop the column `cartUserId` on the `CartItemDetail` table. All the data in the column will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/

-- AlterPrimaryKey
ALTER TABLE "CartItemDetail" ALTER PRIMARY KEY USING COLUMNS ("itemDetailId", "cartItemId");

-- DropForeignKey
ALTER TABLE "CartItemDetail" DROP CONSTRAINT "CartItemDetail_cartUserId_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_cartUserId_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "id" INT8 NOT NULL DEFAULT unique_rowid();
ALTER TABLE "CartItem" ADD COLUMN     "orderId" STRING(30);

-- AlterTable
ALTER TABLE "CartItemDetail" DROP COLUMN "cartUserId";

-- AlterPrimaryKey
ALTER TABLE "CartItem" ALTER PRIMARY KEY USING COLUMNS ("id");

-- DropTable
DROP TABLE "OrderItem";

-- CreateIndex
CREATE INDEX "CartItem_userId_itemId_idx" ON "CartItem"("userId", "itemId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemDetail" ADD CONSTRAINT "CartItemDetail_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
