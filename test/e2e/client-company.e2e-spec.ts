/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/infra/modules/app.module';
import { App } from 'supertest/types';
import request from 'supertest';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';
import { randomUUID } from 'node:crypto';
import { createClient } from '../utils/helpers/crete-client.helper';

describe('ClientCompany (e2e)', () => {
  let app: INestApplication<App>;

  const companyData = {
    name: 'Test Company',
    email: `${randomUUID().replace(/-/g, '')}@email.com`,
    password: 'strongPassword123',
  };

  const clientData = {
    fullName: 'John Doe',
  };

  const dataToCreate = {
    email: 'email@email.com',
    phone: '1234567890',
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

  // ==================== Create ====================
  it('/client-company (POST) - should create a new client company', async () => {
    const token = await singUpAndLogin(app, companyData);
    const internationalId = randomUUID();

    await createClient(app, token, { ...clientData, internationalId });

    const response = await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(201);

    expect(response.body).toEqual({
      message: 'Client Company successfully created',
    });
  });

  it('/client-company (POST) - should throw NotFoundException when the client does not exist', async () => {
    const token = await singUpAndLogin(app, companyData);
    const internationalId = randomUUID();

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(404);
  });

  it('/client-company (POST) - should throw ConflictException when the client company already exists', async () => {
    const token = await singUpAndLogin(app, companyData);
    const internationalId = randomUUID();

    await createClient(app, token, { ...clientData, internationalId });

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(201);

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(409);
  });

  // ==================== Find All ====================
  it('/client-company (GET) - should return a list of client companies', async () => {
    const token = await singUpAndLogin(app, companyData);
    const internationalId = randomUUID();

    await createClient(app, token, { ...clientData, internationalId });

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toMatchObject({
      email: dataToCreate.email,
      phone: dataToCreate.phone,
    });
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('clientId');
  });

  // ==================== Update ====================
  it('/client-company (PATCH) - should update an existing client company', async () => {
    const token = await singUpAndLogin(app, companyData);
    const internationalId = randomUUID();

    await createClient(app, token, { ...clientData, internationalId });

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...dataToCreate, clientInternationalId: internationalId })
      .expect(201);

    const responseBeforeGet = await request(app.getHttpServer())
      .get('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const clientCompanyId = responseBeforeGet.body[0].id;

    const newEmail = 'newemail@email.com';

    await request(app.getHttpServer())
      .patch(`/client-company/${clientCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: newEmail, phone: '1234567' })
      .expect(200);
  });

  it('/client-company (PATCH) - should throw NotFoundException when trying to update a non-existing client company', async () => {
    const token = await singUpAndLogin(app, companyData);
    const nonExistingClientCompanyId = randomUUID();

    await request(app.getHttpServer())
      .patch(`/client-company/${nonExistingClientCompanyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'email@email.com', phone: '1234567' })
      .expect(404);
  });
});
