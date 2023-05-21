import { prisma } from "@/prisma/globalPrismaClient";
import { BloodPressureCategory, BloodPressureReading } from "@prisma/client";
import { differenceInCalendarDays } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const bloodPressureReading: BloodPressureReading = await request.json();

  // WHAT!!!
  // console.log("weight", typeof weighIn.weight);
  // weighIn.weight = new Decimal(weighIn.weight);
  // console.log("weight", typeof weighIn.weight);

  let category: BloodPressureCategory;
  if (
    bloodPressureReading.systolic > 180 ||
    bloodPressureReading.diastolic > 120
  ) {
    category = "HYPERTENSION_CRISIS";
  } else if (
    bloodPressureReading.systolic >= 140 ||
    bloodPressureReading.diastolic >= 90
  ) {
    category = "HYPERTENSION_STAGE_2";
  } else if (bloodPressureReading.systolic >= 130) {
    category = "HYPERTENSION_STAGE_1";
  } else if (bloodPressureReading.diastolic >= 80) {
    category = "HYPERTENSION_STAGE_1";
  } else if (bloodPressureReading.systolic >= 120) {
    category = "ELEVATED";
  } else if (bloodPressureReading.systolic >= 90) {
    category = "NORMAL";
  } else {
    category = "LOW";
  }

  //calculate trends
  let systolicChange;
  let diastolicChange;
  let pulseChange;
  const firstReading = await getFirstReading();
  let previousReading = await getPreviousReading(bloodPressureReading.date);

  if (firstReading == null) {
    systolicChange = 0;
    diastolicChange = 0;
    pulseChange = 0;
  } else {
    if (previousReading === null) {
      throw Error(
        "Unable to find previous blood pressure reading so unable to record reading trends"
      );
    }

    systolicChange = bloodPressureReading.systolic - previousReading.systolic;
    diastolicChange =
      bloodPressureReading.diastolic - previousReading.diastolic;
    if (
      bloodPressureReading.pulse === 0 ||
      bloodPressureReading.pulse === null ||
      previousReading.pulse === 0 ||
      previousReading.pulse === null
    ) {
      pulseChange = null;
    } else {
      pulseChange = bloodPressureReading.pulse - previousReading.pulse;
    }
  }

  const result = await prisma.bloodPressureReading.create({
    data: {
      date: bloodPressureReading.date,
      systolic: bloodPressureReading.systolic,
      diastolic: bloodPressureReading.diastolic,
      pulse: bloodPressureReading.pulse,
      category,
      systolicChange,
      diastolicChange,
      pulseChange,
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

const getFirstReading = async () => {
  return prisma.bloodPressureReading.findFirst({
    orderBy: {
      date: "asc",
    },
    take: 1,
  });
};

type DateDiffed = {
  daysBetween: number;
  event: BloodPressureReading;
};
const getPreviousReading = async (date: Date) => {
  // WHAT! https://itsjavascript.com/javascript-typeerror-toisostring-is-not-a-function
  console.log("date type is", typeof date);
  date = new Date(date);
  console.log("date type is", typeof date);

  const allReadings = await prisma.bloodPressureReading.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const dateDiffed: DateDiffed[] = allReadings
    .map((previous) => {
      return {
        daysBetween: differenceInCalendarDays(date, previous.date),
        event: previous,
      };
    })
    .sort((a, b) => {
      return a.daysBetween - b.daysBetween;
    });

  const previousReadings = dateDiffed.filter(
    (dateDiff) => dateDiff.daysBetween > 0
  );

  if (previousReadings.length > 0) {
    return previousReadings[0].event;
  } else {
    return null;
  }
};
