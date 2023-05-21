import { prisma } from "@/prisma/globalPrismaClient";
import { BloodPressureReading, WeighIn } from "@prisma/client";
import BloodPressureReadingCard from "./(components)/bloodPressure/BloodPressureReadingCard";
import WeighInCard from "./(components)/weighIn/WeighInCard";

export const dynamic = "force-dynamic";

type TimelineEntry = {
  type: "WeighIn" | "BloodPressureReading";
  event: WeighIn | BloodPressureReading;
};

type TimelineEvent = {
  date: Date;
  entries: TimelineEntry[];
};

async function getTimeline(
  weighIns: WeighIn[],
  bloodPressureReadings: BloodPressureReading[]
) {
  // fold in the cheese
  let timeline: TimelineEvent[] = [];
  let uniqueDatesAsNumbers = new Set<number>();
  if (weighIns) {
    weighIns
      .map((weighIn) => weighIn.date)
      .forEach((date) => uniqueDatesAsNumbers.add(date.getTime()));
  }

  if (bloodPressureReadings) {
    bloodPressureReadings
      .map((bloodPressureReadings) => bloodPressureReadings.date)
      .forEach((date) => uniqueDatesAsNumbers.add(date.getTime()));
  }

  let uniqueDates: Date[] = [];
  uniqueDatesAsNumbers.forEach((value) => {
    uniqueDates.push(new Date(value));
  });

  let sortedUniqueDates = uniqueDates.sort(function (a: Date, b: Date) {
    return b.getTime() - a.getTime();
  });

  sortedUniqueDates.forEach((uniqueDate) => {
    let timelineEntry: TimelineEvent = {
      date: uniqueDate,
      entries: [],
    };

    weighIns
      .filter(
        (weighIn) => weighIn.date.getTime() === timelineEntry.date.getTime()
      )
      .forEach((weighIn) => {
        timelineEntry.entries.push({ type: "WeighIn", event: weighIn });
      });

    bloodPressureReadings
      .filter((bpr) => bpr.date.getTime() === timelineEntry.date.getTime())
      .forEach((bpr) => {
        timelineEntry.entries.push({
          type: "BloodPressureReading",
          event: bpr,
        });
      });

    timeline.push(timelineEntry);
  });

  return timeline;
}

async function getWeighIns() {
  const weighIns = await prisma.weighIn.findMany({
    orderBy: {
      date: "desc",
    },
    // select: {
    //   id: true,
    //   date: true,
    //   weight: true,
    //   weightProgress: true,
    //   weightTotalChange: true,
    //   weightToGoal: true,
    // },
  });

  return weighIns;
}

async function getBloodPressureReadings() {
  const bloodPressureReadings = await prisma.bloodPressureReading.findMany({
    orderBy: {
      date: "desc",
    },
    // select: {
    //   id: true,
    //   date: true,
    //   systolic: true,
    //   diastolic: true,
    //   pulse: true,
    //   category: true,
    // },
  });

  return bloodPressureReadings;
}

async function getGoal() {
  const goal = await prisma.goal.findFirst();
  return goal;
}

export default async function Home() {
  const weighIns = await getWeighIns();
  const goal = await getGoal();
  const goalWeight = goal?.weight.toNumber();

  const bloodPressureReadings = await getBloodPressureReadings();

  const timeline = await getTimeline(weighIns, bloodPressureReadings);

  return (
    <>
      <h3 className="my-2 text-center">ab initio</h3>
      <div className="flex flex-col">
        {timeline.map((timelineEvent) => (
          <div
            className="my-4 text-center text-2xl"
            key={timelineEvent.date.getTime()}>
            {timelineEvent.date.toISOString().substring(0, 10)}
            <div className="flex flex-col">
              {timelineEvent.entries.map((entry) => {
                if (entry.type === "WeighIn") {
                  return (
                    <WeighInCard
                      key={entry.event.id}
                      weighIn={entry.event as WeighIn}
                      goalWeight={goalWeight}
                    />
                  );
                } else if (entry.type === "BloodPressureReading") {
                  return (
                    <BloodPressureReadingCard
                      key={entry.event.id}
                      bloodPressureReading={entry.event as BloodPressureReading}
                    />
                  );
                } else {
                  <span>Uhoh</span>;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
