import { WeighIn } from "@prisma/client";

export async function createWeighIn(weighIn: WeighIn) {
  const result = await fetch("/api/weighIns", {
    method: "POST",
    body: JSON.stringify(weighIn),
  });
  return (await result.json()) as WeighIn;
}
