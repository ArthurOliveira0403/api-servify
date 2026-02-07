/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateClientCompanyDTO } from 'src/application/dtos/update-client-company.dto';
import { DateTransformService } from 'src/application/services/date-transform.service';
import { UpdateClientCompanyUseCase } from 'src/application/use-cases/update-client-company.use-case';
import { ClientCompany } from 'src/domain/entities/client-company';
import { ClientCompanyRepository } from 'src/domain/repositories/client-company.repository';
import { InMemoryClientCompanyRepository } from 'test/utils/in-memory/in-memory.client-company.repository';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';

describe('UpdateClientCompanyUseCase', () => {
  let useCase: UpdateClientCompanyUseCase;
  let repository: ClientCompanyRepository;
  let dateTransformService: DateTransformService;
  let spies: any;

  const clientCompanyMock = new ClientCompany({
    id: '1',
    clientId: 'client-1',
    companyId: 'company-1',
    email: 'john@example.com',
    phone: '1234567890',
  });

  const data: UpdateClientCompanyDTO = {
    clientCompanyId: clientCompanyMock.id,
    companyId: clientCompanyMock.companyId,
    email: 'jane@example.com',
    phone: '0987654321',
  };

  const fakeNowUTC = new Date();

  beforeEach(() => {
    jest.clearAllMocks();

    repository = new InMemoryClientCompanyRepository();
    dateTransformService = dateTransformMock;
    useCase = new UpdateClientCompanyUseCase(repository, dateTransformService);

    spies = {
      clientCompanyRepository: {
        findById: jest.spyOn(repository, 'findById'),
        update: jest.spyOn(repository, 'update'),
      },
      clientCompany: {
        updateDetails: jest.spyOn(clientCompanyMock, 'updateDetails'),
      },
      dateTransformService: {
        nowUTC: jest.spyOn(dateTransformService, 'nowUTC'),
      },
    };

    spies.dateTransformService.nowUTC.mockReturnValue(fakeNowUTC);
  });

  it('should update a client-company relation', async () => {
    await repository.save(clientCompanyMock);

    await useCase.handle(data);

    expect(spies.clientCompanyRepository.findById).toHaveBeenCalledWith(
      data.clientCompanyId,
    );
    expect(spies.clientCompany.updateDetails).toHaveBeenCalledWith({
      email: data.email,
      phone: data.phone,
      updatedAt: fakeNowUTC,
    });
    expect(spies.dateTransformService.nowUTC).toHaveBeenCalled();
    expect(spies.clientCompanyRepository.update).toHaveBeenCalled();

    const updatedRelation = await repository.findById(data.clientCompanyId);
    expect(updatedRelation?.email).toBe(data.email);
    expect(updatedRelation?.phone).toBe(data.phone);
  });

  it('should throw NotFoundException if client-company relation does not exist', async () => {
    await expect(useCase.handle(data)).rejects.toThrow(NotFoundException);

    expect(spies.clientCompanyRepository.findById).toHaveBeenCalledWith(
      data.clientCompanyId,
    );
    expect(spies.clientCompanyRepository.update).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if companyId does not match', async () => {
    const invalidData = { ...data, companyId: 'invalid-company-id' };
    await repository.save(clientCompanyMock);

    await expect(useCase.handle(invalidData)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(spies.clientCompanyRepository.findById).toHaveBeenCalledWith(
      data.clientCompanyId,
    );
    expect(spies.clientCompanyRepository.update).not.toHaveBeenCalled();
  });
});
