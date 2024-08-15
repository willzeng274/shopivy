/*
  Warnings:

  - The `detailsList` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "name" STRING NOT NULL DEFAULT 'placeholder';
ALTER TABLE "Item" DROP COLUMN "detailsList";
ALTER TABLE "Item" ADD COLUMN     "detailsList" STRING(127)[];

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
