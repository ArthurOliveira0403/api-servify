/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateClientCompanyDTO } from 'src/application/dtos/create-client-company.dto';
import { CreateClientCompanyUseCase } from 'src/application/use-cases/create-client-company.use-case';
import { Client } from 'src/domain/entities/client';
import { ClientCompany } from 'src/domain/entities/client-company';
import { InMemoryClientCompanyRepository } from 'test/utils/in-memory/in-memory.client-company.repository';
import { InMemoryClientRepository } from 'test/utils/in-memory/in-memory.client-repository';

describe('CreateClientCompanyUseCase', () => {
  let useCase: CreateClientCompanyUseCase;
  let clientCompanyrepository: InMemoryClientCompanyRepository;
  let clientRepository: InMemoryClientRepository;
  let spies: any;

  const clientMock = new Client({
    id: '1',
    internationalId: 'client-company-123',
    fullName: 'Client Name',
  });

  const data: CreateClientCompanyDTO = {
    clientInternationalId: clientMock.internationalId,
    companyId: 'company-123',
    email: 'client@example.com',
    phone: '123-456-7890',
  };

  beforeEach(() => {
    clientCompanyrepository = new InMemoryClientCompanyRepository();
    clientRepository = new InMemoryClientRepository();
    useCase = new CreateClientCompanyUseCase(
      clientRepository,
      clientCompanyrepository,
    );

    spies = {
      clientRepository: {
        findByInternationalId: jest.spyOn(
          clientRepository,
          'findByInternationalId',
        ),
      },
      clientCompanyRepository: {
        save: jest.spyOn(clientCompanyrepository, 'save'),
        findRelation: jest.spyOn(clientCompanyrepository, 'findRelation'),
      },
    };
  });

  it('should create a new client-company relationship', async () => {
    await clientRepository.save(clientMock);

    await useCase.handle(data);

    expect(spies.clientRepository.findByInternationalId).toHaveBeenCalledWith(
      data.clientInternationalId,
    );
    expect(spies.clientCompanyRepository.findRelation).toHaveBeenCalledWith(
      data.companyId,
      clientMock.id,
    );
    expect(spies.clientCompanyRepository.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException if client does not exist', async () => {
    await expect(useCase.handle(data)).rejects.toThrow(NotFoundException);

    expect(spies.clientRepository.findByInternationalId).toHaveBeenCalledWith(
      data.clientInternationalId,
    );
    expect(spies.clientCompanyRepository.findRelation).not.toHaveBeenCalled();
    expect(spies.clientCompanyRepository.save).not.toHaveBeenCalled();
  });

  it('should throw ConflictException if relationship already exists', async () => {
    await clientRepository.save(clientMock);
    await clientCompanyrepository.save(
      new ClientCompany({
        clientId: clientMock.id,
        companyId: data.companyId,
        email: data.email,
        phone: data.phone,
      }),
    );

    await expect(useCase.handle(data)).rejects.toThrow(ConflictException);

    expect(spies.clientRepository.findByInternationalId).toHaveBeenCalledWith(
      data.clientInternationalId,
    );
    expect(spies.clientCompanyRepository.findRelation).toHaveBeenCalledWith(
      data.companyId,
      clientMock.id,
    );
  });
});
