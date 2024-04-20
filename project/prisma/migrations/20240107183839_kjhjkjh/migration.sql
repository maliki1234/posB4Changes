-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "month" SET DEFAULT '1',
ALTER COLUMN "year" SET DEFAULT '2024';

-- CreateTable
CREATE TABLE "Expenditure" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "times" INTEGER NOT NULL,
    "date" TEXT NOT NULL DEFAULT '2023-12-17',
    "time" TEXT NOT NULL DEFAULT '00:00',
    "month" TEXT NOT NULL DEFAULT '1',
    "year" TEXT NOT NULL DEFAULT '2024',
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
