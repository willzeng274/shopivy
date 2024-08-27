-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItemDetail" DROP CONSTRAINT "CartItemDetail_cartUserId_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemDetail" DROP CONSTRAINT "ItemDetail_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" INT8 NOT NULL DEFAULT 990552308395081729;

-- CreateTable
CREATE TABLE "RecoverySession" (
    "id" STRING(30) NOT NULL,
    "userId" INT8 NOT NULL,

    CONSTRAINT "RecoverySession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecoverySession" ADD CONSTRAINT "RecoverySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemDetail" ADD CONSTRAINT "ItemDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemDetail" ADD CONSTRAINT "CartItemDetail_cartUserId_cartItemId_fkey" FOREIGN KEY ("cartUserId", "cartItemId") REFERENCES "CartItem"("userId", "itemId") ON DELETE CASCADE ON UPDATE CASCADE;
