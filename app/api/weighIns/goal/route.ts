import { prisma } from "@/prisma/globalPrismaClient";
import { Goal } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const goal: Goal = await request.json();
  if (goal.id) {
    const result = await prisma.goal.update({
      data: {
        weight: goal.weight,
      },
      where: {
        id: goal.id,
      },
    });
    return NextResponse.json(result);
  } else {
    const result = await prisma.goal.create({
      data: {
        weight: goal.weight,
      },
    });
    return NextResponse.json(result);
  }
}
