/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { AuthModule } from 'src/infra/modules/auth.module';
import { ServiceModule } from 'src/infra/modules/service.module';
import { CreateServiceBodyDTO } from 'src/infra/schemas/create-service.schemas';
import { SignUpBodyDTO } from 'src/infra/schemas/sign-up.schemas';
import { singUpAndLogin } from 'test/utils/helpers/sign-up-and-login.helper';

describe('Service (e2e)', () => {
  let app: NestFastifyApplication;
  let companyData: SignUpBodyDTO;
  let serviceData: CreateServiceBodyDTO;
  let token: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ServiceModule, AuthModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    companyData = {
      name: 'Luminnus',
      cnpj: `${randomUUID()}`,
      email: `${randomUUID()}@email.com`,
      password: '123245678',
    };

    serviceData = {
      name: `Service name_${randomUUID()}`,
      description: 'A description',
      basePrice: Number((Math.random() * (10 + 500) + 10).toFixed(2)), // Pode causar erros de precisão no arredondamento
    };

    token = await singUpAndLogin(app, companyData);
  });

  afterAll(async () => {
    await app.close();
  });

  // ==================== Create Service ====================
  it('/service (POST) - should create a service', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: serviceData,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(body).toMatchObject({
      message: 'Service successfully created',
    });
    expect(body).toHaveProperty('serviceId');
  });

  // ==================== List all of the Company ====================
  it('/service (GET) - should list all services of the company', async () => {
    await app.inject({
      method: 'POST',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: serviceData,
    });

    const response = await app.inject({
      method: 'GET',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0]).toMatchObject({ ...serviceData });
  });

  it('/service (GET) - should return [] when the company have not Services', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  // ==================== Update Service ====================
  it('/service (PATCH) - should update a Service', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: serviceData,
    });

    const bodyCreate = JSON.parse(createResponse.body);

    const response = await app.inject({
      method: 'PATCH',
      url: `/service/${bodyCreate.serviceId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        name: 'NewName',
        description: 'NewDescription',
        basePrice: 299.99,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      message: 'Successfully service updated',
    });
    expect(body).toHaveProperty('service');
  });

  it('/service (PATCH) - should return 404 when the service does not exists', async () => {
    const fakeServiceId = '12345678';

    await app
      .inject({
        method: 'PATCH',
        url: `/service/${fakeServiceId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          name: 'NewName',
          description: 'NewDescription',
          basePrice: 299.99,
        },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(404);
      });
  });

  it('/service (PATCH) - should throw UnauthorizedException when the service not belong to the Company', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: serviceData,
    });

    const body = JSON.parse(response.body);

    const otherToken = await singUpAndLogin(app, {
      name: 'Lumi',
      cnpj: `${randomUUID()}`,
      email: 'lumi@emai.com',
      password: '1234',
    });

    await app
      .inject({
        method: 'PATCH',
        url: `/service/${body.serviceId}`,
        headers: {
          authorization: `Bearer ${otherToken}`,
        },
        body: {
          name: 'NewName',
          description: 'NewDescription',
          basePrice: 299.99,
        },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(401);
      });
  });

  // ==================== Delete Service ====================
  it('/service (DELETE) - should delete a Service', async () => {
    const createResponse = await app.inject({
      method: 'POST',
      url: '/service',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: serviceData,
    });

    const bodyCreate = JSON.parse(createResponse.body);

    const response = await app.inject({
      method: 'DELETE',
      url: `/service/${bodyCreate.serviceId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      message: 'Successfully service deleted',
    });
  });

  it('/service (DELETE) - should return 404 when the service does not exists', async () => {
    const fakeServiceId = '12345678';

    await app
      .inject({
        method: 'DELETE',
        url: `/service/${fakeServiceId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .catch((result) => {
        expect(result.statusCode).toBe(404);
      });
  });
});
