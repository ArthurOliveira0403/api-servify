/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createClientCompanyAndReturnId(
  app: INestApplication<App>,
  token: string,
  data: { clientInternationalId: string; email?: string; phone?: string },
): Promise<string> {
  await request(app.getHttpServer())
    .post('/client-company')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

  const response = await request(app.getHttpServer())
    .get('/client-company')
    .set('Authorization', `Bearer ${token}`);

  const clienCompany = response.body[0];

  if (!clienCompany) throw new Error('ClienCompany not exists in helper');

  return clienCompany.id;
}
