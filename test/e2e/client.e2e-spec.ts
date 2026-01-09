import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/infra/modules/app.module';
import { App } from 'supertest/types';
import request from 'supertest';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';
import { randomUUID } from 'node:crypto';

describe('Client (e2e)', () => {
  let app: INestApplication<App>;

  const company = {
    name: 'Luminnus',
    email: `${randomUUID().replace(/-/g, '_')}@email.com`,
    password: '123456',
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

  it('/client (POST) - should create a client', async () => {
    const token = await singUpAndLogin(app, company);
    const data = {
      fullName: 'Jane Doe',
      internationalId: `${randomUUID().replace(/-/g, '')}`,
    };

    const response = await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201);

    expect(response.body).toMatchObject({
      message: 'Client successfully created',
    });
  });

  it('/client (POST) - should ConflicException when the client already exists', async () => {
    const token = await singUpAndLogin(app, company);
    const data = {
      fullName: 'Jane Doe',
      internationalId: `${randomUUID().replace(/-/g, '')}`,
    };

    await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201);

    await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(409);
  });
});
