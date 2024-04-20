-- CreateEnum
CREATE TYPE "state" AS ENUM ('active', 'freeze');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "state" "state" NOT NULL DEFAULT 'active';
