/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { randomUUID } from 'node:crypto';
import { AuthModule } from 'src/infra/modules/auth.module';
import { SignUpBodyDTO } from 'src/infra/schemas/sign-up.schemas';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;

  const data: SignUpBodyDTO = {
    name: 'Luminnus',
    cnpj: `${randomUUID()}`,
    email: `${randomUUID().replace(/-/g, '_')}@email.com`,
    password: '123456',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Sign Up
  it('/auth/signup (POST) - should register a company', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(201);
  });

  it('/auth/signup (POST) - should not signup with duplicated email', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(401);
  });

  // Sign In
  it('/auth/signin (POST) - should log in a company and return a token', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
  });

  it('/auth/signin (POST) - should not signin with invalid email', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'lume@email.com',
        password: data.password,
      })
      .expect(404);
  });

  it('/auth/signin (POST) - should not signin with invalid password', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: data.email,
        password: '33333',
      })
      .expect(401);
  });
});
