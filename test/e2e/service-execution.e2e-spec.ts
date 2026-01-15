/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { AuthModule } from 'src/infra/modules/auth.module';
import { ClientCompanyModule } from 'src/infra/modules/client-company.module';
import { ClientModule } from 'src/infra/modules/client.module';
import { ServiceExecutionModule } from 'src/infra/modules/service-execution.module';
import { ServiceModule } from 'src/infra/modules/service.module';
import { createClientCompanyAndReturnId } from 'test/utils/helpers/create-client-company.helper';
import { createServiceAndReturnId } from 'test/utils/helpers/create-service.helper';
import { createClient } from 'test/utils/helpers/crete-client.helper';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';

describe('ServiceExecution (e2e)', () => {
  let app: NestFastifyApplication;
  let token: string;

  let dataToCreate: {
    serviceId: string;
    clientCompanyId: string;
    executedAt: string;
  };

  const otheCompanyData = {
    name: 'otherLuminnus',
    email: `${randomUUID()}`,
    password: '123456',
  };

  let clientData: { fullName: string; internationalId: string };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ServiceExecutionModule,
        AuthModule,
        ServiceModule,
        ClientModule,
        ClientCompanyModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    const companyData = {
      name: 'Luminnus',
      email: `${randomUUID()}@emai.com`,
      password: '123456',
    };

    const serviceData = {
      name: 'A service',
      description: 'A description',
      basePrice: Number((Math.random() * (10 + 410) + 10).toFixed(2)),
    };

    clientData = {
      fullName: 'Full Name',
      internationalId: `${randomUUID()}`,
    };

    const clientCompanyData = {
      clientInternationalId: clientData.internationalId,
      email: 'email@email.com',
      phone: '12345678',
    };

    token = await singUpAndLogin(app, companyData);
    const serviceId = await createServiceAndReturnId(app, token, serviceData);
    await createClient(app, token, clientData);
    const clientCompanyId = await createClientCompanyAndReturnId(
      app,
      token,
      clientCompanyData,
    );

    dataToCreate = {
      clientCompanyId,
      serviceId,
      executedAt: '2025-02-01',
    };
  });

  it('/service-execution (POST) - should create a ServiceExecution', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/service-execution',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: dataToCreate,
    });

    expect(response.statusCode).toBe(201);
  });

  it('/service-execution (POST) - should return 404 when the Service not exists', async () => {
    await app
      .inject({
        method: 'POST',
        url: '/service-execution',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { ...dataToCreate, serviceId: 'fake-id' },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(404);
      });
  });

  it('/service-execution (POST) - should return 404 when the ClientCompany not exists', async () => {
    await app
      .inject({
        method: 'POST',
        url: '/service-execution',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { ...dataToCreate, clientCompanyId: 'fake-id' },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(404);
      });
  });

  it('/service-execution (POST) - should return 400 when the "User" companyId does not macth with Service companyId', async () => {
    const otherTokenCompany = await singUpAndLogin(app, otheCompanyData);

    const otherServiceId = await createServiceAndReturnId(
      app,
      otherTokenCompany,
      { name: 'otherName', description: 'otherDescription', basePrice: 99.99 },
    );

    await app
      .inject({
        method: 'POST',
        url: '/service-execution',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { ...dataToCreate, serviceId: otherServiceId },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(400);
      });
  });

  it('/service-execution (POST) - should return 400 when the "User" companyId does not macth with ClientCompany companyId', async () => {
    const otherTokenCompany = await singUpAndLogin(app, otheCompanyData);

    const otherClientCompanyId = await createClientCompanyAndReturnId(
      app,
      otherTokenCompany,
      {
        clientInternationalId: clientData.internationalId,
        email: 'email@email.com',
        phone: '123455',
      },
    );

    await app
      .inject({
        method: 'POST',
        url: '/service-execution',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: { ...dataToCreate, clientCompanyId: otherClientCompanyId },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(400);
      });
  });

  it('/service-execution (POST) - should return 400 when the "User" companyId does not match with Service and ClientCompanyId', async () => {
    const otheCompanyData = {
      name: 'otherLuminnus',
      email: `${randomUUID()}`,
      password: '123456',
    };

    const otherTokenCompany = await singUpAndLogin(app, otheCompanyData);

    await app
      .inject({
        method: 'POST',
        url: '/service-execution',
        headers: {
          authorization: `Bearer ${otherTokenCompany}`,
        },
        body: { ...dataToCreate },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(400);
      });
  });
});
