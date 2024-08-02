/*
  Warnings:

  - The `detailsList` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "detailsList";
ALTER TABLE "Item" ADD COLUMN     "detailsList" STRING(127)[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "code" DROP NOT NULL;
