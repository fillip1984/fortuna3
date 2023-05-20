import { prisma } from "@/prisma/globalPrismaClient";
import { BloodPressureCategory, BloodPressureReading } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const bloodPressureReading: BloodPressureReading = await request.json();

  // WHAT!!!
  // console.log("weight", typeof weighIn.weight);
  // weighIn.weight = new Decimal(weighIn.weight);
  // console.log("weight", typeof weighIn.weight);

  let category: BloodPressureCategory;
  if (
    bloodPressureReading.systolic < 120 &&
    bloodPressureReading.diastolic < 80
  ) {
    category = "NORMAL";
  } else if (
    bloodPressureReading.systolic >= 120 &&
    bloodPressureReading.systolic <= 129 &&
    bloodPressureReading.diastolic < 80
  ) {
    category = "ELEVATED";
  } else if (
    bloodPressureReading.systolic >= 130 &&
    bloodPressureReading.systolic <= 139 &&
    bloodPressureReading.diastolic >= 80 &&
    bloodPressureReading.diastolic <= 89
  ) {
    category = "HYPERTENSION_STAGE_1";
  } else if (
    (bloodPressureReading.systolic >= 140 &&
      bloodPressureReading.systolic < 179) ||
    (bloodPressureReading.diastolic >= 90 &&
      bloodPressureReading.diastolic <= 119)
  ) {
    category = "HYPERTENSION_STAGE_2";
  } else if (
    bloodPressureReading.systolic >= 180 ||
    bloodPressureReading.diastolic >= 120
  ) {
    category = "HYPERTENSION_CRISIS";
  } else {
    throw Error("Unable to determine blood pressure category");
  }

  const result = await prisma.bloodPressureReading.create({
    data: {
      date: bloodPressureReading.date,
      systolic: bloodPressureReading.systolic,
      diastolic: bloodPressureReading.diastolic,
      pulse: bloodPressureReading.pulse,
      category,
    },
  });
  return NextResponse.json(result);
}

export async function GET() {
  const bloodPressureReadings = await prisma.bloodPressureReading.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      systolic: true,
      diastolic: true,
      pulse: true,
      category: true,
    },
  });

  return bloodPressureReadings;
}
