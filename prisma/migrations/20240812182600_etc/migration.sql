/*
  Warnings:

  - You are about to drop the column `detail` on the `CartItemDetail` table. All the data in the column will be lost.
  - You are about to drop the column `detailsList` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ItemDetail` table. All the data in the column will be lost.
  - Added the required column `itemDetailId` to the `CartItemDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `ItemDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItemDetail" DROP COLUMN "detail";
ALTER TABLE "CartItemDetail" ADD COLUMN     "itemDetailId" INT8 NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "detailsList";
ALTER TABLE "Item" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ItemDetail" DROP COLUMN "value";
ALTER TABLE "ItemDetail" ADD COLUMN     "detail" STRING(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItemDetail" ADD CONSTRAINT "CartItemDetail_itemDetailId_fkey" FOREIGN KEY ("itemDetailId") REFERENCES "ItemDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
