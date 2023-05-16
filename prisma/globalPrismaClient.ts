import { PrismaClient } from "@prisma/client";

/**
 * Defines single prisma client
 * See: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// wondering what the double questionmark does, it's called nullish coalescing. It returns the right side of the operator (??) if the left side is null
// See: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// console.log(
//   "Checking if not in production, if not then generating global prisma client"
// );
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
