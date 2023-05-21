import { BloodPressureCategory, BloodPressureReading } from "@prisma/client";
import { BsCalendarEvent, BsHeartPulseFill } from "react-icons/bs";
import { GiHearts, GiNestedHearts } from "react-icons/gi";

const determineBloodPressureCategory = (
  bloodPressureCategory: BloodPressureCategory
) => {
  if (bloodPressureCategory === "NORMAL") {
    return (
      <>
        <div className="my-1 h-6 w-6 rounded-full bg-green-600"></div>
        <span className="text-xs text-green-600">Normal</span>
      </>
    );
  } else if (bloodPressureCategory === "ELEVATED") {
    return (
      <>
        <div className="my-1 h-6 w-6 rounded-full bg-yellow-300"></div>
        <span className="text-xs text-yellow-300">Elevated</span>
      </>
    );
  } else if (bloodPressureCategory === "HYPERTENSION_STAGE_1") {
    return (
      <>
        <div className="my-1 h-6 w-6 rounded-full bg-orange-400"></div>
        <span className="text-xs text-orange-400">Hypertension 1</span>
      </>
    );
  } else if (bloodPressureCategory === "HYPERTENSION_STAGE_2") {
    return (
      <>
        <div className="my-1 h-6 w-6 rounded-full bg-orange-600"></div>
        <span className="text-xs text-orange-600">Hypertension 2</span>
      </>
    );
  } else if (bloodPressureCategory === "HYPERTENSION_CRISIS") {
    return (
      <>
        <div className="my-1 h-6 w-6 rounded-full bg-red-600"></div>
        <span className="text-xs text-red-600">Hypertension Crisis</span>
      </>
    );
  } else {
    throw Error(
      "Unable to determine blood pressure category for: " +
        bloodPressureCategory
    );
  }
};

export default function BloodPressureReadingCard({
  bloodPressureReading,
}: {
  bloodPressureReading: BloodPressureReading;
}) {
  return (
    <div
      key={bloodPressureReading.id}
      className="flex flex-col rounded-lg border-2">
      <div className="flex items-center justify-center gap-2 bg-gray-100 p-1">
        <BsCalendarEvent />
        {bloodPressureReading.date.toISOString().substring(0, 10)}
      </div>
      <div className="flex justify-between bg-gray-100 p-4">
        <span className="flex flex-col items-center text-3xl">
          <span className="text-xs uppercase text-gray-500">Systolic</span>
          {bloodPressureReading.systolic.toString()}
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <GiHearts /> mmHg
          </span>
        </span>
        <span className="flex flex-col items-center text-3xl">
          <span className="text-xs uppercase text-gray-500">Diastolic</span>
          {bloodPressureReading.diastolic.toString()}
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <GiNestedHearts /> mmHg
          </span>
        </span>
        <span className="flex flex-col items-center text-3xl">
          <span className="text-xs uppercase text-gray-500">Pulse</span>
          {bloodPressureReading.pulse?.toString() ?? "N/A"}
          <span className="flex items-center gap-2 text-xs text-gray-500">
            <BsHeartPulseFill /> BPM
          </span>
        </span>
        <span className="flex flex-col items-center text-3xl">
          <span className="text-xs uppercase text-gray-500">Category</span>
          {determineBloodPressureCategory(bloodPressureReading.category)}
        </span>
      </div>
    </div>
  );
}
