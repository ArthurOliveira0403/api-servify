/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceController } from 'src/infra/http/controllers/service.controller';
import { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import { ServiceReponseMapper } from 'src/infra/mappers/service-response.mapper';

const createServiceUseCaseMock = {
  provide: CreateServiceUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const listServicesUseCaseMock = {
  provide: ListServicesUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const updateServiceUseCaseMock = {
  provide: UpdateServiceUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const deleteServiceUseCaseMock = {
  provide: DeleteServiceUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

describe('ServiceController', () => {
  let serviceController: ServiceController;
  let spies: any;

  const user: ReturnJwtStrategy = {
    id: '1',
    email: 'email@email.com',
    role: 'COMPANY',
  };

  const dataToCreate = {
    name: 'Service',
    description: 'A complete Service',
    basePrice: 2345.67,
  };

  const serviceMock1Id = '1';

  const dataToUpdate = {
    serviceId: serviceMock1Id,
    name: 'Tire repair',
    description: 'A complete tire repair',
    basePrice: 69.99,
  };

  const serviceMock1 = new Service({
    id: serviceMock1Id,
    companyId: user.id,
    name: 'Service',
    description: 'A complete Service',
    basePrice: 2345.67,
  });

  const serviceMock2 = new Service({
    companyId: user.id,
    name: 'Tire repair',
    description: 'A complete tire repair',
    basePrice: 69.99,
  });

  const serviceMock3 = new Service({
    companyId: user.id,
    name: 'Oil change',
    description: 'A complete car repair',
    basePrice: 200.15,
  });

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        createServiceUseCaseMock,
        listServicesUseCaseMock,
        updateServiceUseCaseMock,
        deleteServiceUseCaseMock,
      ],
      controllers: [ServiceController],
    }).compile();

    serviceController = moduleRef.get(ServiceController);
    const createServiceUseCase = moduleRef.get(CreateServiceUseCase);
    const listServicesUseCase = moduleRef.get(ListServicesUseCase);
    const updateServiceUseCase = moduleRef.get(UpdateServiceUseCase);
    const deleteServiceUseCase = moduleRef.get(DeleteServiceUseCase);

    spies = {
      createServiceUseCase: {
        handle: jest.spyOn(createServiceUseCase, 'handle'),
      },
      listServicesUseCase: {
        handle: jest.spyOn(listServicesUseCase, 'handle'),
      },
      updateServiceUseCase: {
        handle: jest.spyOn(updateServiceUseCase, 'handle'),
      },
      deleteServiceUseCase: {
        handle: jest.spyOn(deleteServiceUseCase, 'handle'),
      },
      serviceResponseMapper: {
        unique: jest.spyOn(ServiceReponseMapper, 'unique'),
        various: jest.spyOn(ServiceReponseMapper, 'various'),
      },
    };
  });

  // ==================== Create method ====================
  it('should create a Service', async () => {
    spies.createServiceUseCase.handle.mockResolvedValue(undefined);

    await serviceController.create(user, dataToCreate);

    expect(spies.createServiceUseCase.handle).toHaveBeenCalledWith({
      ...dataToCreate,
      companyId: user.id,
    });
  });

  // ==================== List method ====================
  it('should list all Services by company', async () => {
    const responseUseCase = [serviceMock1, serviceMock2, serviceMock3];
    spies.listServicesUseCase.handle.mockResolvedValue(responseUseCase);

    spies.serviceResponseMapper.various.mockReturnValue(responseUseCase);

    const services = await serviceController.listAll(user);

    expect(spies.listServicesUseCase.handle).toHaveBeenCalledWith({
      companyId: user.id,
    });
    expect(services).toEqual(responseUseCase);
  });

  it('should return [] when company have not services', async () => {
    spies.serviceResponseMapper.various.mockReturnValue([]);

    const services = await serviceController.listAll(user);

    expect(spies.listServicesUseCase.handle).toHaveBeenCalledWith({
      companyId: user.id,
    });
    expect(services).toEqual([]);
  });

  // ==================== Update method ====================
  it('should update a Service', async () => {
    spies.updateServiceUseCase.handle.mockResolvedValue(undefined);

    const response = await serviceController.update(
      serviceMock1Id,
      dataToUpdate,
    );

    expect(spies.updateServiceUseCase.handle).toHaveBeenCalledWith(
      dataToUpdate,
    );
    expect(response.message).toBe('Successfully service updated');
  });

  it('should throw NotFoundException when the service does not exists', async () => {
    spies.updateServiceUseCase.handle.mockRejectedValue(
      new NotFoundException(),
    );

    const fakeServiceId = '1234567';

    await expect(
      serviceController.update(fakeServiceId, dataToUpdate),
    ).rejects.toThrow(NotFoundException);
    expect(spies.updateServiceUseCase.handle).toHaveBeenCalledWith({
      ...dataToUpdate,
      serviceId: fakeServiceId,
    });
  });

  // ==================== Delete method ====================
  it('should delete a Service', async () => {
    spies.deleteServiceUseCase.handle.mockResolvedValue(undefined);

    const response = await serviceController.delete(serviceMock1Id);

    expect(spies.deleteServiceUseCase.handle).toHaveBeenCalledWith({
      serviceId: serviceMock1Id,
    });
    expect(response.message).toBe('Successfully service deleted');
  });

  it('should throw NotFoundException when the service does not exists', async () => {
    spies.deleteServiceUseCase.handle.mockRejectedValue(
      new NotFoundException(),
    );

    const fakeServiceId = '123456';

    await expect(serviceController.delete(fakeServiceId)).rejects.toThrow(
      NotFoundException,
    );
    expect(spies.deleteServiceUseCase.handle).toHaveBeenCalledWith({
      serviceId: fakeServiceId,
    });
  });
});
