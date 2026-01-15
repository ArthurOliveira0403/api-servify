import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createClient(
  app: INestApplication<App>,
  token: string,
  data: { fullName: string; internationalId: string },
): Promise<void> {
  await request(app.getHttpServer())
    .post('/client')
    .set('Authorization', `Bearer ${token}`)
    .send(data);
}
