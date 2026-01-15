/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';

export async function createServiceAndReturnId(
  app: INestApplication<App>,
  token: string,
  data: { name: string; description: string; basePrice: number },
): Promise<string> {
  await request(app.getHttpServer())
    .post('/service')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

  const response = await request(app.getHttpServer())
    .get('/service')
    .set('Authorization', `Bearer ${token}`);

  const service = response.body[0];

  if (!service) throw new Error('Service not exists in helper');

  return service.id;
}
