/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException } from '@nestjs/common';
import { CreateClientDTO } from 'src/application/dtos/create-client.dto';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.use-case';
import { Client } from 'src/domain/entities/client';
import { InMemoryClientRepository } from 'test/utils/in-memory/in-memory.client-repository';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let repository: InMemoryClientRepository;
  let spies: any;

  const data: CreateClientDTO = {
    fullName: 'John Doe',
    internationalId: '123456789',
  };

  beforeEach(() => {
    repository = new InMemoryClientRepository();
    useCase = new CreateClientUseCase(repository);

    spies = {
      clientRepository: {
        save: jest.spyOn(repository, 'save'),
        findByInternationalId: jest.spyOn(repository, 'findByInternationalId'),
      },
    };
  });

  it('should create a new client', async () => {
    await useCase.handle(data);

    const clientCreated = await repository.findByInternationalId(
      data.internationalId,
    );

    expect(spies.clientRepository.findByInternationalId).toHaveBeenCalledWith(
      data.internationalId,
    );
    expect(spies.clientRepository.save).toHaveBeenCalledWith(
      expect.any(Client),
    );
    expect(repository.clients).toHaveLength(1);
    expect(clientCreated?.fullName).toBe(data.fullName);
  });

  it('should throw ConflictException when internationalId already exists', async () => {
    await repository.save(new Client(data));

    await expect(useCase.handle(data)).rejects.toThrow(ConflictException);

    expect(spies.clientRepository.findByInternationalId).toHaveBeenCalledWith(
      data.internationalId,
    );
    expect(repository.clients).toHaveLength(1);
  });
});
