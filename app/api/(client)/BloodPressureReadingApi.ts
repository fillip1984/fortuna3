import { BloodPressureReading, WeighIn } from "@prisma/client";

export async function createBloodPressureReading(
  bloodPressureReading: BloodPressureReading
) {
  const result = await fetch("/api/bloodPressureReadings", {
    method: "POST",
    body: JSON.stringify(bloodPressureReading),
  });
  return (await result.json()) as BloodPressureReading;
}

export async function getBloodPressureReadings() {
  const result = await fetch("/api/bloodPressureReadings");
  return (await result.json()) as BloodPressureReading[];
}

export async function deleteBloodPressureReading(id: string) {
  const result = await fetch(`/api/bloodPressureReadings/${id}`, {
    method: "DELETE",
  });
  return result;
}
