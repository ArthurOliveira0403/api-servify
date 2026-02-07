/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { CreateClientCompanyBodyDTO } from 'src/infra/schemas/create-client-company.schemas';
import request from 'supertest';
import { App } from 'supertest/types';

export async function createClientCompanyAndReturnId(
  app: INestApplication<App>,
  token: string,
  data: CreateClientCompanyBodyDTO,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/client-company')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

  const clientCompanyId = response.body.clientCompanyId;

  if (!clientCompanyId || clientCompanyId === undefined)
    throw new Error('ClientCompany id not exists in helper');

  return clientCompanyId;
}
