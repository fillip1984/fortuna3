import { WeighIn } from "@prisma/client";

export async function createWeighIn(weighIn: WeighIn) {
  const result = await fetch("/api/weighIns", {
    method: "POST",
    body: JSON.stringify(weighIn),
  });
  return (await result.json()) as WeighIn;
}

export async function getWeighIns() {
  const result = await fetch("/api/weighIns");
  return (await result.json()) as WeighIn[];
}
