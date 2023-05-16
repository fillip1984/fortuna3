/*
  Warnings:

  - You are about to drop the column `previousWeighIn` on the `WeighIn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeighIn" DROP COLUMN "previousWeighIn",
ADD COLUMN     "previousWeighInId" TEXT;
