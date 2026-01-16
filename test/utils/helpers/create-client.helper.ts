import { INestApplication } from '@nestjs/common';
import { CreateClientBodyDTO } from 'src/infra/schemas/create-client.schemas';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createClient(
  app: INestApplication<App>,
  token: string,
  data: CreateClientBodyDTO,
): Promise<void> {
  await request(app.getHttpServer())
    .post('/client')
    .set('Authorization', `Bearer ${token}`)
    .send(data);
}
