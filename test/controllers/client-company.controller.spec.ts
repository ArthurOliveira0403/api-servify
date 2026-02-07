/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientCompanyUseCase } from 'src/application/use-cases/create-client-company.use-case';
import { ListManyByCompanyClientsCompanyUseCase } from 'src/application/use-cases/list-many-by-company-clients-company';
import { UpdateClientCompanyUseCase } from 'src/application/use-cases/update-client-company.use-case';
import { ClientCompany } from 'src/domain/entities/client-company';
import { ClientCompanyController } from 'src/infra/http/controllers/client-company.controller';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';
import { ClientCompanyResponseMapper } from 'src/infra/http/mappers/client-company-response.mapper';
import { CreateClientCompanyBodyDTO } from 'src/infra/schemas/create-client-company.schemas';

const createClientCompanyUseCaseMock = {
  provide: CreateClientCompanyUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const listManyByCompanyClientsCompanyUseCaseMock = {
  provide: ListManyByCompanyClientsCompanyUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const updateClientCompanyUseCaseMock = {
  provide: UpdateClientCompanyUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

describe('ClientCompanyController', () => {
  let controller: ClientCompanyController;
  let spies: any;

  const user: ReturnCompanyUser = {
    id: 'user-id-123',
    cnpj: '1234567',
    email: 'company@email.com',
    role: 'COMPANY',
  };

  const dataToCreate: CreateClientCompanyBodyDTO = {
    fullName: 'John Doe',
    internationalId: '1234567890',
    email: 'email@example.com',
    phone: '+1234567890',
  };

  const clientCompanyId = 'client-company-id-123';

  const dataToUpdate = {
    email: 'email@example.com',
    phone: '+1234567890',
  };

  const clientCompany1 = new ClientCompany({
    id: 'client-company-1',
    clientId: 'client-1',
    companyId: 'company-123',
    email: 'email@email.com',
    phone: '1234567890',
  });

  const clientCompany2 = new ClientCompany({
    id: 'client-company-2',
    clientId: 'client-2',
    companyId: 'company-123',
    email: 'email2@email.com',
    phone: '0987654321',
  });

  const clientCompany3 = new ClientCompany({
    id: 'client-company-3',
    clientId: 'client-3',
    companyId: 'company-123',
    email: 'newEmail@email.com',
    phone: '123456',
  });

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ClientCompanyController],
      providers: [
        createClientCompanyUseCaseMock,
        listManyByCompanyClientsCompanyUseCaseMock,
        updateClientCompanyUseCaseMock,
      ],
    }).compile();

    controller = moduleRef.get<ClientCompanyController>(
      ClientCompanyController,
    );
    const createClientCompanyUseCase =
      moduleRef.get<CreateClientCompanyUseCase>(CreateClientCompanyUseCase);
    const listManyByCompanyClientsCompaniesUseCase =
      moduleRef.get<ListManyByCompanyClientsCompanyUseCase>(
        ListManyByCompanyClientsCompanyUseCase,
      );
    const updateClientCompanyUseCase =
      moduleRef.get<UpdateClientCompanyUseCase>(UpdateClientCompanyUseCase);

    spies = {
      createClientCompanyUseCase: {
        handle: jest.spyOn(createClientCompanyUseCase, 'handle'),
      },
      listManyByCompanyClientsCompaniesUseCase: {
        handle: jest.spyOn(listManyByCompanyClientsCompaniesUseCase, 'handle'),
      },
      updateClientCompanyUseCase: {
        handle: jest.spyOn(updateClientCompanyUseCase, 'handle'),
      },
      mapper: {
        handle: jest.spyOn(ClientCompanyResponseMapper, 'handle'),
      },
    };
  });

  // ================== Create method ===================
  it('should create a client company', async () => {
    const responseUseCase = { clientCompanyId: '12345' };

    spies.createClientCompanyUseCase.handle.mockResolvedValue(responseUseCase);

    const response = await controller.create(user, dataToCreate);

    expect(spies.createClientCompanyUseCase.handle).toHaveBeenCalledWith({
      ...dataToCreate,
      companyId: user.id,
    });
    expect(response.message).toBe('Client Company successfully created');
    expect(response.clientCompanyId).toBe(responseUseCase.clientCompanyId);
  });

  it('should throw NotFoundException when creating a client company with non-existing client', async () => {
    spies.createClientCompanyUseCase.handle.mockRejectedValue(
      new NotFoundException(),
    );
    await expect(controller.create(user, dataToCreate)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw ConflictException when creating a client company with existing relation', async () => {
    spies.createClientCompanyUseCase.handle.mockRejectedValue(
      new ConflictException(),
    );
    await expect(controller.create(user, dataToCreate)).rejects.toThrow(
      ConflictException,
    );
  });

  // ================= FindAll method =================

  it('should find all client companies for a company', async () => {
    spies.listManyByCompanyClientsCompaniesUseCase.handle.mockResolvedValue([
      clientCompany1,
      clientCompany2,
      clientCompany3,
    ]);
    spies.mapper.handle.mockImplementation((c: ClientCompany) => c);

    const response = await controller.findAll(user);

    expect(
      spies.listManyByCompanyClientsCompaniesUseCase.handle,
    ).toHaveBeenCalledWith({
      companyId: user.id,
    });

    expect(spies.mapper.handle).toHaveBeenCalledTimes(3);
    expect(spies.mapper.handle).toHaveBeenNthCalledWith(1, clientCompany1);
    expect(spies.mapper.handle).toHaveBeenNthCalledWith(2, clientCompany2);
    expect(spies.mapper.handle).toHaveBeenNthCalledWith(3, clientCompany3);

    expect(response).toEqual([clientCompany1, clientCompany2, clientCompany3]);
  });

  // ================= Update method ===================
  it('should update a client company', async () => {
    spies.updateClientCompanyUseCase.handle.mockResolvedValue(undefined);

    const response = await controller.update(
      user,
      clientCompanyId,
      dataToUpdate,
    );

    expect(spies.updateClientCompanyUseCase.handle).toHaveBeenCalledWith({
      ...dataToUpdate,
      companyId: user.id,
      clientCompanyId: clientCompanyId,
    });
    expect(response.message).toBe('Client Company successfully updated');
  });

  it('should throw NotFoundException when updating a non-existing client company', async () => {
    spies.updateClientCompanyUseCase.handle.mockRejectedValue(
      new NotFoundException(),
    );

    await expect(
      controller.update(user, clientCompanyId, dataToUpdate),
    ).rejects.toThrow(NotFoundException);

    expect(spies.updateClientCompanyUseCase.handle).toHaveBeenCalledWith({
      ...dataToUpdate,
      companyId: user.id,
      clientCompanyId: clientCompanyId,
    });
  });

  it('should throw UnauthorizedException when updating a client company not belonging to the company', async () => {
    spies.updateClientCompanyUseCase.handle.mockRejectedValue(
      new UnauthorizedException(),
    );

    await expect(
      controller.update(user, clientCompanyId, dataToUpdate),
    ).rejects.toThrow(UnauthorizedException);

    expect(spies.updateClientCompanyUseCase.handle).toHaveBeenCalledWith({
      ...dataToUpdate,
      companyId: user.id,
      clientCompanyId: clientCompanyId,
    });
  });
});
