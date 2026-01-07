/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';

describe('DeleteServiceUseCase', () => {
  let useCase: DeleteServiceUseCase;
  let repository: ServiceRespository;
  let spies: any;

  const serviceId = '1';

  const serviceMock = new Service({
    id: serviceId,
    name: 'Service',
    companyId: '2',
    description: 'A service',
    basePrice: 159.99,
  });

  beforeEach(() => {
    repository = new InMemoryServiceRepository();
    useCase = new DeleteServiceUseCase(repository);

    spies = {
      serviceRespository: {
        findById: jest.spyOn(repository, 'findById'),
        delete: jest.spyOn(repository, 'delete'),
      },
    };
  });

  it('should delete a company', async () => {
    await repository.save(serviceMock);
    await useCase.handle({ serviceId });

    expect(spies.serviceRespository.findById).toHaveBeenCalledWith(serviceId);
    expect(spies.serviceRespository.delete).toHaveBeenCalledWith(serviceId);

    const service = await repository.findById(serviceId);
    expect(service).toBeNull();
  });

  it('should throw a NotFoundException when serviceId is invalid', async () => {
    await repository.save(serviceMock);

    const fakeId = '123456';

    await expect(useCase.handle({ serviceId: fakeId })).rejects.toThrow(
      NotFoundException,
    );

    expect(spies.serviceRespository.findById).toHaveBeenLastCalledWith(fakeId);
  });
});
