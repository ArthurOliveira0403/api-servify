/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';

export async function singUpAndLogin(
  app: INestApplication<App>,
  data: { name?: string; email: string; password: string },
): Promise<string> {
  await request(app.getHttpServer()).post('/auth/signup').send(data);
  const response = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({ email: data.email, password: data.password });

  return response.body.accessToken as string;
}
