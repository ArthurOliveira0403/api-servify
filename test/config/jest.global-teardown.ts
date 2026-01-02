import { PrismaClient } from '@prisma/client';

export default async () => {
  const schema = process.env.TEST_SCHEMA;
  const prisma = new PrismaClient();

  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
};
