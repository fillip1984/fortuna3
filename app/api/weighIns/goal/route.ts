import { prisma } from "@/prisma/globalPrismaClient";
import { Goal } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
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

export async function GET() {
  let goal = await prisma.goal.findFirst();
  // get or return new... there should ALWAYS only be 1 goal
  if (goal === null) {
    goal = {
      id: "",
      weight: new Decimal(0),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  return NextResponse.json(goal);
}
