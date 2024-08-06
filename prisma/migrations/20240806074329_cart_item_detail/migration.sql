/*
  Warnings:

  - The `detailsList` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "detailsList";
ALTER TABLE "Item" ADD COLUMN     "detailsList" STRING(127)[];

-- CreateTable
CREATE TABLE "ItemDetail" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "value" STRING(255) NOT NULL,
    "itemId" INT8 NOT NULL,

    CONSTRAINT "ItemDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItemDetail" (
    "cartUserId" INT8 NOT NULL,
    "cartItemId" INT8 NOT NULL,

    CONSTRAINT "CartItemDetail_pkey" PRIMARY KEY ("cartUserId","cartItemId")
);

-- AddForeignKey
ALTER TABLE "ItemDetail" ADD CONSTRAINT "ItemDetail_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemDetail" ADD CONSTRAINT "CartItemDetail_cartUserId_cartItemId_fkey" FOREIGN KEY ("cartUserId", "cartItemId") REFERENCES "CartItem"("userId", "itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
