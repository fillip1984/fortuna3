import { prisma } from "@/prisma/globalPrismaClient";
import { BsCalendarEvent } from "react-icons/bs";
import { GiStairsGoal } from "react-icons/gi";
import { IoScaleOutline } from "react-icons/io5";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";
import { GiHearts, GiNestedHearts } from "react-icons/gi";
import { BsHeartPulseFill } from "react-icons/bs";

export const dynamic = "force-dynamic";

async function getWeighIns() {
  const weighIns = await prisma.weighIn.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      date: true,
      weight: true,
      weightProgress: true,
      weightTotalChange: true,
      weightToGoal: true,
    },
  });

  return weighIns;
}

async function getBloodPressureReadings() {
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

async function getGoal() {
  const goal = await prisma.goal.findFirst();
  return goal;
}

export default async function Home() {
  const weighIns = await getWeighIns();
  const goal = await getGoal();
  const goalWeight = goal?.weight.toNumber();

  const bloodPressureReadings = await getBloodPressureReadings();

  return (
    <>
      <h3 className="my-2 text-center">ab initio</h3>

      <div className="flex flex-col gap-2">
        {weighIns.map((weighIn) => (
          <div key={weighIn.id} className="flex flex-col rounded-lg border-2">
            <div className="flex items-center justify-center gap-2 bg-gray-100 p-1">
              <BsCalendarEvent />
              {weighIn.date.toISOString().substring(0, 10)}
            </div>
            <div className="flex flex-1 justify-between bg-gray-100 p-4">
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">Weight</span>
                {weighIn.weight.toNumber()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <IoScaleOutline /> lbs
                </span>
              </span>
              <span className="flex flex-col items-center text-xl">
                <span className="text-xs uppercase text-gray-500">To Date</span>
                {weighIn.weightProgress.toNumber()}
                {weighIn.weightProgress.isPositive() &&
                  !weighIn.weightProgress.isZero() && <MdTrendingUp />}
                {weighIn.weightProgress.isZero() && <MdTrendingFlat />}
                {weighIn.weightProgress.isNegative() && <MdTrendingDown />}
              </span>
              <span className="flex flex-col items-center text-xl">
                <span className="text-xs uppercase text-gray-500">Total</span>
                {weighIn.weightTotalChange.toNumber()}
                {weighIn.weightTotalChange.isPositive() &&
                  !weighIn.weightTotalChange.isZero() && <MdTrendingUp />}
                {weighIn.weightTotalChange.isZero() && <MdTrendingFlat />}
                {weighIn.weightTotalChange.isNegative() && <MdTrendingDown />}
              </span>
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">To Goal</span>
                {weighIn.weightToGoal.toNumber()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <GiStairsGoal />
                  {goalWeight} lbs
                </span>
              </span>
            </div>

            {/* TODO: add in additional stats? */}
            {/* <div className="flex justify-around border-t-2 border-t-gray-200 bg-gray-300 p-2">
              <span>
                23% bf <GiMuscleFat />
              </span>
              <span>28.4 BMI</span>
            </div> */}
          </div>
        ))}
      </div>

      <div className="my-4 flex flex-col gap-2">
        {bloodPressureReadings.map((bloodPressureReading) => (
          <div
            key={bloodPressureReading.id}
            className="flex flex-col rounded-lg border-2">
            <div className="flex items-center justify-center gap-2 bg-gray-100 p-1">
              <BsCalendarEvent />
              {bloodPressureReading.date.toISOString().substring(0, 10)}
            </div>
            <div className="flex justify-between bg-gray-100 p-4">
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">
                  Systolic
                </span>
                {bloodPressureReading.systolic.toString()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <GiHearts /> mmHg
                </span>
              </span>
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">
                  Diastolic
                </span>
                {bloodPressureReading.diastolic.toString()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <GiNestedHearts /> mmHg
                </span>
              </span>
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">Pulse</span>
                {bloodPressureReading.pulse?.toString()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <BsHeartPulseFill /> BPM
                </span>
              </span>
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">
                  Category
                </span>
                <span className="text-xl text-green-600">
                  {bloodPressureReading.category.toString()}
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="h-4 w-4 rounded-full bg-green-600"></div>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
