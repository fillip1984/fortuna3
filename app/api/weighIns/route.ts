import { prisma } from "@/prisma/globalPrismaClient";
import { WeighIn } from "@prisma/client";
import { NextResponse } from "next/server";
import { differenceInCalendarDays, differenceInDays, parseISO } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";

type WeighInDateDiffed = {
  daysBetween: number;
  weighIn: WeighIn;
};

export async function POST(request: Request) {
  const weighIn: WeighIn = await request.json();
  // WHAT!!!
  //   console.log("weight", typeof weighIn.weight);
  //   weighIn.weight = new Decimal(weighIn.weight);
  //   console.log("weight", typeof weighIn.weight);

  const firstWeighIn = await getFirstWeighIn();
  const previousWeighIn = (await getPreviousWeighIn(weighIn.date)).weighIn;
  const goal = await getGoal();
  const goalWeight = goal.weight.toNumber();

  // calculate trends
  let weightProgress;
  let weightToGoal;
  let weightTotalChange;

  if (firstWeighIn == null) {
    //first time weighing in
    weightProgress = 0;
    weightTotalChange = 0;
    weightToGoal =
      Math.round((weighIn.weight.toNumber() - goalWeight) * 100) / 100;
  } else if (previousWeighIn) {
    weightProgress = (
      weighIn.weight.toNumber() - previousWeighIn.weight.toNumber()
    ).toFixed(2);

    weightTotalChange = (
      weighIn.weight.toNumber() - firstWeighIn.weight.toNumber()
    ).toFixed(2);

    weightToGoal = (weighIn.weight.toNumber() - goalWeight).toFixed(2);
  } else {
    throw Error("Cannot find previous weigh In");
  }

  const result = await prisma.weighIn.create({
    data: {
      date: weighIn.date,
      weight: weighIn.weight,
      bodyFatPercentage: weighIn.bodyFatPercentage,
      weightProgress,
      weightTotalChange,
      weightToGoal,
      previousWeighInId: previousWeighIn.id,
    },
  });
  return NextResponse.json(result);
}

const getPreviousWeighIn = async (date: Date) => {
  // WHAT! https://itsjavascript.com/javascript-typeerror-toisostring-is-not-a-function
  //   console.log("date type is", typeof date);
  //   date = new Date(date);
  //   console.log("date type is", typeof date);

  const allWeighIns = await prisma.weighIn.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const weighInDateDiffed: WeighInDateDiffed[] = allWeighIns
    .map((previous) => {
      return {
        daysBetween: differenceInCalendarDays(date, previous.date),
        weighIn: previous,
      };
    })
    .sort((a, b) => {
      return a.daysBetween - b.daysBetween;
    });

  const previousWeighIns = weighInDateDiffed.filter(
    (weighInDateDiff) => weighInDateDiff.daysBetween > 0
  );

  if (previousWeighIns.length > 0) {
    return previousWeighIns[0];
  } else {
    throw Error("Unable to find previous weigh in");
  }
};

const getFirstWeighIn = async () => {
  const firstWeighIn = await prisma.weighIn.findFirst({
    orderBy: {
      date: "asc",
    },
    take: 1,
  });
  return firstWeighIn;
};

const getGoal = async () => {
  let goal = await prisma.goal.findFirst();

  if (goal === null) {
    throw Error("No goal has been set");
  }

  return goal;
};
