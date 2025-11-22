import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'default@gmail.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'defaultPassword';

  const adminExist = await prisma.admin.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminExist) {
    const hashPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await prisma.admin.create({
      data: {
        id: randomUUID(),
        email: ADMIN_EMAIL,
        password: hashPassword,
        role: 'ADMIN',
      },
    });
    logger.log('Admin succesfully created');
  } else {
    logger.warn('Admin already exist. Ignored seed');
  }
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
