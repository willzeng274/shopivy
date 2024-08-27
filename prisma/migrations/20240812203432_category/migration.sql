-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Book', 'Electronic', 'Stationary', 'Course', 'Dorm', 'Tutoring', 'Service', 'Other');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Other';
