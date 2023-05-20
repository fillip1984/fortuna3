import { Goal } from "@prisma/client";

export async function createOrUpdateWeightGoal(goal: Goal) {
  const result = await fetch("/api/weighIns/goal", {
    method: "POST",
    body: JSON.stringify(goal),
  });
  return (await result.json()) as Goal;
}

export async function getGoal() {
  const result = await fetch("/api/weighIns/goal");
  return (await result.json()) as Goal;
}
