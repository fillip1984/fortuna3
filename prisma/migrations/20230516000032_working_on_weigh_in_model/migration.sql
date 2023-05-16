-- CreateTable
CREATE TABLE "WeighIn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "weightProgress" DECIMAL(65,30) NOT NULL,
    "weightTotalChange" DECIMAL(65,30) NOT NULL,
    "weightToGoal" DECIMAL(65,30) NOT NULL,
    "bodyFatPercentage" DECIMAL(65,30),
    "bodyFatProgress" DECIMAL(65,30),
    "bodyFatTotalChange" DECIMAL(65,30),
    "previousWeighIn" TEXT,

    CONSTRAINT "WeighIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeighIn_date_key" ON "WeighIn"("date");
