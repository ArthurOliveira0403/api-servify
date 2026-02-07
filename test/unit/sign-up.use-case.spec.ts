/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UnauthorizedException } from '@nestjs/common';
import { SignUpDTO } from 'src/application/dtos/sign-up.dto';
import { DateTransformService } from 'src/application/services/date-transform.service';
import { HasherService } from 'src/application/services/password-hasher.service';
import { SignUpUseCase } from 'src/application/use-cases/sign-up.use-case';
import { Company } from 'src/domain/entities/company';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { InMemoryCompanyRepository } from 'test/utils/in-memory/in-memory.company-repository';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';
import { HasherServiceMock } from 'test/utils/mocks/hasher-service.mock';

describe('SignUpUseCase', () => {
  let useCase: SignUpUseCase;
  let repository: CompanyRepository;
  let hasher: HasherService;
  let dateTransformService: DateTransformService;
  let spies: any;

  const data: SignUpDTO = {
    name: 'Luminnus',
    cnpj: '12345678',
    email: 'luminnus@email.com',
    password: '123456',
  };

  beforeEach(() => {
    repository = new InMemoryCompanyRepository();
    hasher = HasherServiceMock;
    dateTransformService = dateTransformMock;
    useCase = new SignUpUseCase(repository, hasher, dateTransformService);

    spies = {
      repository: {
        findByEmail: jest.spyOn(repository, 'findByEmail'),
        save: jest.spyOn(repository, 'save'),
      },
      hasher: {
        hash: jest.spyOn(hasher, 'hash'),
      },
      dateTransformService: {
        nowUTC: jest.spyOn(dateTransformService, 'nowUTC'),
      },
    };
  });

  it('should register a Company', async () => {
    await useCase.handle(data);

    expect(spies.repository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(spies.hasher.hash).toHaveBeenCalledWith(data.password);
    expect(spies.dateTransformService.nowUTC).toHaveBeenCalled();
    expect(spies.repository.save).toHaveBeenCalledWith(expect.any(Company));
  });

  it('should throw error for the company already exist', async () => {
    await repository.save(
      new Company({
        ...data,
      }),
    );

    await expect(useCase.handle(data)).rejects.toThrow(UnauthorizedException);
    expect(spies.repository.findByEmail).toHaveBeenCalledWith(data.email);
  });
});
