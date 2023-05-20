import { prisma } from "@/prisma/globalPrismaClient";
import { BloodPressureCategory, BloodPressureReading } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const bloodPressureReading: BloodPressureReading = await request.json();

  // WHAT!!!
  // console.log("weight", typeof weighIn.weight);
  // weighIn.weight = new Decimal(weighIn.weight);
  // console.log("weight", typeof weighIn.weight);

  let category: BloodPressureCategory = "NORMAL";

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
