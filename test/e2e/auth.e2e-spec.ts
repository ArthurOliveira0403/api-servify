import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/infra/modules/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { cleanDatabase } from 'test/utils/prisma-cleaner.util';

describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaClient;

  const data = {
    name: 'Luminnus',
    email: 'luminnus@email.com',
    password: '123456',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await cleanDatabase(prisma);
  });

  // Sign Up
  it('should register a company', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(201);
  });

  it('should not signup with duplicated email', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(data)
      .expect(401);
  });

  // Sign In
  it('should log in a company and return a token', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.accessToken).toBeDefined();
  });

  it('shoudl not signin with invalid email', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'lumin@email.com',
        password: data.password,
      })
      .expect(404);
  });

  it('shoudl not signin with invalid password', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send(data);

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: data.email,
        password: '33333',
      })
      .expect(401);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
