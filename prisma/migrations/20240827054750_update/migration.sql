-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "seller" BOOL NOT NULL DEFAULT false;
