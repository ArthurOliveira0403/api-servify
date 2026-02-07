/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PriceConverter } from 'src/application/common/price-converter.common';
import { CreateServiceDTO } from 'src/application/dtos/create-service.dto';
import { DateTransformService } from 'src/application/services/date-transform.service';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';

describe('createServiceUseCase', () => {
  let useCase: CreateServiceUseCase;
  let serviceRepository: ServiceRespository;
  let dateTransformService: DateTransformService;
  let spies: any;

  const data: CreateServiceDTO = {
    companyId: '1',
    name: 'Service',
    description: 'A service',
    basePrice: 200,
  };

  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository();
    dateTransformService = dateTransformMock;
    useCase = new CreateServiceUseCase(serviceRepository, dateTransformService);

    spies = {
      serviceRepository: {
        save: jest.spyOn(serviceRepository, 'save'),
      },
      priceConverter: {
        toRepository: jest.spyOn(PriceConverter, 'toRepository'),
      },
      dateTransformService: {
        nowUTC: jest.spyOn(dateTransformService, 'nowUTC'),
      },
    };
  });

  it('should save a service', async () => {
    await useCase.handle(data);

    expect(spies.priceConverter.toRepository).toHaveBeenCalledWith(
      data.basePrice,
    );
    expect(spies.dateTransformService.nowUTC).toHaveBeenCalled();
    expect(spies.serviceRepository.save).toHaveBeenLastCalledWith(
      expect.any(Service),
    );
  });
});
