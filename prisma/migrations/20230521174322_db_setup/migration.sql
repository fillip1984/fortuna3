-- CreateEnum
CREATE TYPE "BloodPressureCategory" AS ENUM ('LOW', 'NORMAL', 'ELEVATED', 'HYPERTENSION_STAGE_1', 'HYPERTENSION_STAGE_2', 'HYPERTENSION_CRISIS');

-- CreateTable
CREATE TABLE "WeighIn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "weightProgress" DECIMAL(65,30) NOT NULL,
    "weightTotalChange" DECIMAL(65,30) NOT NULL,
    "weightToGoal" DECIMAL(65,30) NOT NULL,
    "bodyFatPercentage" DECIMAL(65,30),
    "bodyFatProgress" DECIMAL(65,30),
    "bodyFatTotalChange" DECIMAL(65,30),
    "previousWeighInId" TEXT,

    CONSTRAINT "WeighIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodPressureReading" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "systolic" INTEGER NOT NULL,
    "diastolic" INTEGER NOT NULL,
    "pulse" INTEGER,
    "systolicChange" INTEGER NOT NULL,
    "diastolicChange" INTEGER NOT NULL,
    "pulseChange" INTEGER,
    "category" "BloodPressureCategory" NOT NULL,

    CONSTRAINT "BloodPressureReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeighIn_date_key" ON "WeighIn"("date");

-- CreateIndex
CREATE UNIQUE INDEX "BloodPressureReading_date_key" ON "BloodPressureReading"("date");
