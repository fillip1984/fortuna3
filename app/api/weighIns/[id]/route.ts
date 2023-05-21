import { prisma } from "@/prisma/globalPrismaClient";
import { NextResponse } from "next/server";

interface ApiContextProps {
  params: { id: string };
}
export async function DELETE(request: Request, context: ApiContextProps) {
  const { id } = context.params;
  const result = await prisma.weighIn.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "deleted" });
}
