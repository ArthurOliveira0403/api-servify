/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { App } from 'supertest/types';
import request from 'supertest';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';
import { randomUUID } from 'node:crypto';
import { ClientCompanyModule } from 'src/infra/modules/client-company.module';
import { ClientModule } from 'src/infra/modules/client.module';
import { AuthModule } from 'src/infra/modules/auth.module';
import { SignUpBodyDTO } from 'src/infra/schemas/sign-up.schemas';
import { CreateClientCompanyBodyDTO } from 'src/infra/schemas/create-client-company.schemas';

describe('ClientCompany (e2e)', () => {
  let app: INestApplication<App>;
  let companyData: SignUpBodyDTO;

  const dataToCreate: CreateClientCompanyBodyDTO = {
    fullName: 'John Doe',
    internationalId: `${randomUUID()}`,
    email: 'email@email.com',
    phone: '1234567890',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ClientCompanyModule, ClientModule, AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    companyData = {
      name: 'Test Company',
      cnpj: `${randomUUID()}`,
      email: `${randomUUID().replace(/-/g, '')}@email.com`,
      password: 'strongPassword123',
    };
  });

  afterAll(async () => {
    await app.close();
  });

  // ==================== Create ====================
  it('/client-company (POST) - should create a new client company', async () => {
    const token = await singUpAndLogin(app, companyData);

    const response = await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...dataToCreate,
      })
      .expect(201);

    expect(response.body).toMatchObject({
      message: 'Client Company successfully created',
    });
    expect(response.body).toHaveProperty('clientCompanyId');
  });

  it('/client-company (POST) - should throw ConflictException when the client company already exists', async () => {
    const token = await singUpAndLogin(app, companyData);

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...dataToCreate,
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...dataToCreate,
      })
      .expect(409);
  });

  // ==================== Find All ====================
  it('/client-company (GET) - should return a list of client companies', async () => {
    const token = await singUpAndLogin(app, companyData);

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...dataToCreate,
      })
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

    await request(app.getHttpServer())
      .post('/client-company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...dataToCreate,
      })
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
