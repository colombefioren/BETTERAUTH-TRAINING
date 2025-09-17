import { PrismaClient } from "@/generated/prisma";

export const getDatabaseUrl = () => {
  const forceIpv6 = process.env.FORCE_IPV6 === "true";
  if (forceIpv6 || process.env.NODE_ENV === "production") {
    return process.env.DATABASE_URL_DIRECT!;
  }
  return process.env.DATABASE_URL_SESSION!;
};

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
