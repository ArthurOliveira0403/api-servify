/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { ServiceStatus } from 'src/domain/entities/service';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { Client } from 'src/domain/entities/client';
import { Service } from 'src/domain/entities/service';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { ServiceRespository } from 'src/domain/repositories/service.repository';
import { InMemoryClientRepository } from 'test/utils/in-memory/in-memory.client-repository';
import { InMemoryServiceRepository } from 'test/utils/in-memory/in-memory.service-repository';

describe('createServiceUseCase', () => {
  let useCase: CreateServiceUseCase;
  let serviceRepository: ServiceRespository;
  let clientRepository: ClientRepository;
  let spies: any;

  const clientMock = new Client({
    cpf: '123456',
    name: 'name',
    email: 'email@email.com',
    phoneNumber: '1234567',
  });

  const data = {
    clientCpf: clientMock.cpf,
    description: 'A service',
    price: 200,
    status: 'IN_PROGRESS' as ServiceStatus,
    start_at: new Date(),
  };

  const companyId = '1';

  beforeEach(() => {
    serviceRepository = new InMemoryServiceRepository();
    clientRepository = new InMemoryClientRepository();
    useCase = new CreateServiceUseCase(serviceRepository, clientRepository);

    spies = {
      serviceRepository: {
        save: jest.spyOn(serviceRepository, 'save'),
      },
      clientRepository: {
        findByCpf: jest.spyOn(clientRepository, 'findByCpf'),
      },
    };
  });

  it('should save a service', async () => {
    await clientRepository.save(clientMock);

    await useCase.handle(data, companyId);

    expect(spies.clientRepository.findByCpf).toHaveBeenCalledWith(
      clientMock.cpf,
    );
    expect(spies.serviceRepository.save).toHaveBeenLastCalledWith(
      expect.any(Service),
    );
  });

  it('should Throw a NotFoundException when the client not exist', async () => {
    const fakeCpf = '12345456';

    await expect(
      useCase.handle({ ...data, clientCpf: fakeCpf }, companyId),
    ).rejects.toThrow(NotFoundException);

    expect(spies.clientRepository.findByCpf).toHaveBeenCalledWith(fakeCpf);
  });
});
