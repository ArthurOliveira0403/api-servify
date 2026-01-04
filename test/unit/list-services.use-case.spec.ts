/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';
import { Service } from 'src/domain/entities/service';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';

describe('ListServicesUseCase', () => {
  let useCase: ListServicesUseCase;
  let repository: ServiceRespository;
  let spies: any;

  const companyId = '1';

  const serviceMock = new Service({
    client_id: '2',
    company_id: companyId,
    description: 'A service',
    price: 200,
    status: 'IN_PROGRESS',
    start_at: new Date(),
  });

  const serviceMock2 = new Service({
    client_id: '12',
    company_id: companyId,
    description: 'A service',
    price: 99.99,
    status: 'DONE',
    start_at: new Date('2025-12-02'),
    finished_at: new Date(),
  });

  const serviceMock3 = new Service({
    client_id: '212',
    company_id: companyId,
    description: 'A service',
    price: 159.99,
    status: 'PENDING',
  });

  beforeEach(async () => {
    repository = new InMemoryServiceRepository();
    useCase = new ListServicesUseCase(repository);

    await repository.save(serviceMock);
    await repository.save(serviceMock2);
    await repository.save(serviceMock3);

    spies = {
      serviceRepository: {
        findManyByCompany: jest.spyOn(repository, 'findManyByCompany'),
      },
    };
  });

  it('should list services', async () => {
    const services = await useCase.handle({ companyId });

    expect(spies.serviceRepository.findManyByCompany).toHaveBeenCalledWith(
      companyId,
    );
    expect(services).toEqual([serviceMock, serviceMock2, serviceMock3]);
  });

  it('should return a "[]" when the company has not services', async () => {
    const fakeId = '123456';

    const services = await useCase.handle({ companyId: fakeId });

    expect(spies.serviceRepository.findManyByCompany).toHaveBeenCalledWith(
      fakeId,
    );
    expect(services).toEqual([]);
  });
});
