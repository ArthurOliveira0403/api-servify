import dotenv from 'dotenv';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

export default () => {
  dotenv.config({ path: '.env.test' });

  const schema = `test_${randomUUID().replace(/-/g, '_')}`;

  process.env.TEST_SCHEMA = schema;
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${schema}`;

  execSync('npx prisma db push', { stdio: 'inherit' });
};
