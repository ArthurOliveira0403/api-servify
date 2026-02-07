/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateServiceExecutionDTO } from 'src/application/dtos/create-service-execution.dto';
import { DateTransformService } from 'src/application/services/date-transform.service';
import { CreateServiceExecutionUseCase } from 'src/application/use-cases/create-service-execution.use-case';
import { ClientCompany } from 'src/domain/entities/client-company';
import { Service } from 'src/domain/entities/service';
import { ServiceExecution } from 'src/domain/entities/service-execution';
import { ClientCompanyRepository } from 'src/domain/repositories/client-company.repository';
import { ServiceExecutionRepository } from 'src/domain/repositories/service-execution.repository';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryClientCompanyRepository } from 'test/utils/in-memory/in-memory.client-company.repository';
import { InMemoryServiceExecutionRespository } from 'test/utils/in-memory/in-memory.service-execution-repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';

describe('CreateServiceExecutionUseCase', () => {
  let useCase: CreateServiceExecutionUseCase;
  let serviceExecutionRepository: ServiceExecutionRepository;
  let serviceRepository: ServiceRespository;
  let clientCompanyRepository: ClientCompanyRepository;
  let dateTransformService: DateTransformService;
  let spies: any;

  const companyId = '1';

  const serviceMock = new Service({
    companyId,
    name: 'A service',
    description: 'A description',
    basePrice: 299.99,
  });

  const clienCompanyMock = new ClientCompany({
    companyId,
    clientId: '2',
    email: 'email@email.com',
    phone: '1223468',
  });

  const data: CreateServiceExecutionDTO = {
    companyId,
    clientCompanyId: clienCompanyMock.id,
    serviceId: serviceMock.id,
    executedAt: '2025-02-01',
  };

  beforeEach(() => {
    serviceExecutionRepository = new InMemoryServiceExecutionRespository();
    serviceRepository = new InMemoryServiceRepository();
    clientCompanyRepository = new InMemoryClientCompanyRepository();
    dateTransformService = dateTransformMock;

    useCase = new CreateServiceExecutionUseCase(
      serviceExecutionRepository,
      serviceRepository,
      clientCompanyRepository,
      dateTransformService,
    );

    spies = {
      serviceRepository: {
        findById: jest.spyOn(serviceRepository, 'findById'),
      },
      clientCompanyRepository: {
        findById: jest.spyOn(clientCompanyRepository, 'findById'),
      },
      serviceExecutionRepository: {
        save: jest.spyOn(serviceExecutionRepository, 'save'),
      },
      dateTransformService: {
        nowUTC: jest.spyOn(dateTransformService, 'nowUTC'),
      },
    };
  });

  it('should create a Service Execution', async () => {
    await serviceRepository.save(serviceMock);
    await clientCompanyRepository.save(clienCompanyMock);

    await useCase.handle(data);

    expect(spies.serviceRepository.findById).toHaveBeenCalledWith(
      data.serviceId,
    );
    expect(spies.clientCompanyRepository.findById).toHaveBeenCalledWith(
      data.clientCompanyId,
    );
    expect(spies.dateTransformService.nowUTC).toHaveBeenCalled();
    expect(spies.serviceExecutionRepository.save).toHaveBeenCalledWith(
      expect.any(ServiceExecution),
    );
  });

  it('should throw NotFoundException when the service does not exists', async () => {
    await serviceRepository.save(serviceMock);
    await clientCompanyRepository.save(clienCompanyMock);

    const fakeServiceId = '1234567890';

    await expect(
      useCase.handle({ ...data, serviceId: fakeServiceId }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when the clientCompany does not exists', async () => {
    await serviceRepository.save(serviceMock);
    await clientCompanyRepository.save(clienCompanyMock);

    const fakeClienCompanyId = '1234567890';

    await expect(
      useCase.handle({ ...data, clientCompanyId: fakeClienCompanyId }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw a BadRequestException when the Service companyId does not match with the ClientCompany companyId', async () => {
    await serviceRepository.save(serviceMock);
    await clientCompanyRepository.save(clienCompanyMock);

    const otherServiceMock = new Service({
      companyId: '1234567890',
      name: 'A name',
      description: 'A description',
      basePrice: 129.99,
    });
    await serviceRepository.save(otherServiceMock);

    await expect(
      useCase.handle({ ...data, serviceId: otherServiceMock.id }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw a BadRequestException when the Service companyId does not match with the "User" companyId', async () => {
    await serviceRepository.save(serviceMock);
    await clientCompanyRepository.save(clienCompanyMock);

    const otherCompanyId = '1234567890';

    await expect(
      useCase.handle({ ...data, companyId: otherCompanyId }),
    ).rejects.toThrow(BadRequestException);
  });
});
