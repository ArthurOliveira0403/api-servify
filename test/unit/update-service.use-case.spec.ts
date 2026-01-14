/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { PriceConverter } from 'src/application/common/price-converter.common';
import { UpdateServiceDTO } from 'src/application/dtos/update-service.dto';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';

describe('UpdateServiceUseCase', () => {
  let useCase: UpdateServiceUseCase;
  let repository: ServiceRespository;
  let spies: any;

  const serviceId = '1';
  const serviceMock = new Service({
    id: serviceId,
    name: 'Service',
    companyId: '2',
    description: 'A service',
    basePrice: 99.99,
  });

  const data: UpdateServiceDTO = {
    serviceId,
    description: 'A description',
    basePrice: 129.99,
  };

  beforeEach(() => {
    repository = new InMemoryServiceRepository();
    useCase = new UpdateServiceUseCase(repository);
    spies = {
      serviceRepository: {
        findById: jest.spyOn(repository, 'findById'),
        update: jest.spyOn(repository, 'update'),
      },
      priceConverter: {
        toRepository: jest.spyOn(PriceConverter, 'toRepository'),
      },
      service: {
        update: jest.spyOn(serviceMock, 'update'),
      },
    };
  });

  it('should update a service', async () => {
    await repository.save(serviceMock);

    await useCase.handle(data);

    expect(spies.priceConverter.toRepository).toHaveBeenCalledWith(
      data.basePrice,
    );
    expect(spies.serviceRepository.findById).toHaveBeenCalledWith(serviceId);
    expect(spies.service.update).toHaveBeenCalled();
    expect(spies.serviceRepository.update).toHaveBeenCalledWith(
      expect.any(Service),
    );
  });

  it('should throw a NotFoundException when serviceId is invalid', async () => {
    await repository.save(serviceMock);

    const fakeId = '123456';

    await expect(
      useCase.handle({ ...data, serviceId: fakeId }),
    ).rejects.toThrow(NotFoundException);

    expect(spies.serviceRepository.findById).toHaveBeenCalledWith(fakeId);
  });
});
