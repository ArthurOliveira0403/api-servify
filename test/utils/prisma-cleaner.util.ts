import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient) {
  const tables = await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;

  for (const { tablename } of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE`,
    );
  }
}
