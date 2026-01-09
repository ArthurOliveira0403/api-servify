import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { AppModule } from 'src/infra/modules/app.module';
import request from 'supertest';
import { App } from 'supertest/types';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';

describe('Company (e2e)', () => {
  let app: INestApplication<App>;

  const companyData = {
    name: 'Lumin',
    email: `${randomUUID().replace(/-/g, '_')}@email.com`,
    password: '123456',
  };

  const data = {
    cnpj: '3123213',
    phoneNumber: '0201831890',
    address: {
      country: 'Brazil',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
    },
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/company (PATCH) - should update a company', async () => {
    const token = await singUpAndLogin(app, companyData);

    const response = await request(app.getHttpServer())
      .patch('/company')
      .send(data)
      .set('Authorization', `Bearer ${token}`)
      .set('Timezone', 'America/Brasilia')
      .expect(200);

    expect(response.body).toMatchObject({
      message: 'Company successfully updated',
      company: { ...data },
    });
  });

  it('/company (PATCH) - should return 401 when token is invalid', async () => {
    await singUpAndLogin(app, companyData);

    await request(app.getHttpServer())
      .patch('/company')
      .send(data)
      .set('Authorization', `Bearer invalid_token`)
      .set('Timezone', 'America/Brasilia')
      .expect(401);
  });
});
