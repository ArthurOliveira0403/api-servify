/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { PriceConverter } from 'src/application/common/price-converter.common';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';

describe('UpdateServiceUseCase', () => {
  let useCase: UpdateServiceUseCase;
  let repository: ServiceRespository;
  let spies: any;

  const data = {
    description: 'A description',
    price: 129.99,
  };

  const serviceId = '1';
  const serviceMock = new Service({
    id: serviceId,
    clientId: '1',
    companyId: '2',
    description: 'A service',
    price: 99.99,
    status: 'DONE',
    startAt: new Date('2025-12-02'),
    finishedAt: new Date(),
  });

  beforeEach(() => {
    repository = new InMemoryServiceRepository();
    useCase = new UpdateServiceUseCase(repository);
    spies = {
      serviceRepository: {
        findById: jest.spyOn(repository, 'findById'),
        update: jest.spyOn(repository, 'update'),
      },
      service: {
        update: jest.spyOn(serviceMock, 'update'),
      },
    };
  });

  it('should update a service', async () => {
    await repository.save(serviceMock);

    const service = await useCase.handle(serviceId, data);

    expect(spies.serviceRepository.findById).toHaveBeenCalledWith(serviceId);
    expect(spies.service.update).toHaveBeenCalled();
    expect(spies.serviceRepository.update).toHaveBeenCalledWith(
      expect.any(Service),
    );
    expect(service).toEqual(expect.any(Service));
    expect(service!.description).toBe(data.description);
    expect(service!.price).toBe(PriceConverter.toRepository(data.price));
  });

  it('should throw a NotFoundException when serviceId is invalid', async () => {
    await repository.save(serviceMock);

    const fakeId = '123456';

    await expect(useCase.handle(fakeId, data)).rejects.toThrow(
      NotFoundException,
    );

    expect(spies.serviceRepository.findById).toHaveBeenCalledWith(fakeId);
  });
});
