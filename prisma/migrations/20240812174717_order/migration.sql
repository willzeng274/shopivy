/*
  Warnings:

  - You are about to drop the column `details` on the `CartItem` table. All the data in the column will be lost.
  - The `detailsList` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ordered` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `CartItemDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'shipped', 'delivered', 'returned', 'failed');

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "details";
ALTER TABLE "CartItem" ADD COLUMN     "ordered" BOOL NOT NULL;

-- AlterTable
ALTER TABLE "CartItemDetail" ADD COLUMN     "detail" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "detailsList";
ALTER TABLE "Item" ADD COLUMN     "detailsList" STRING(127)[];

-- CreateTable
CREATE TABLE "Review" (
    "authorId" INT8 NOT NULL,
    "itemId" INT8 NOT NULL,
    "anonymous" BOOL NOT NULL,
    "rating" INT2 NOT NULL,
    "comment" STRING(255),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("authorId","itemId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" STRING(30) NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" STRING(30) NOT NULL,
    "cartUserId" INT8 NOT NULL,
    "cartItemId" INT8 NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId","cartUserId","cartItemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_cartUserId_cartItemId_key" ON "OrderItem"("cartUserId", "cartItemId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_cartUserId_cartItemId_fkey" FOREIGN KEY ("cartUserId", "cartItemId") REFERENCES "CartItem"("userId", "itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
