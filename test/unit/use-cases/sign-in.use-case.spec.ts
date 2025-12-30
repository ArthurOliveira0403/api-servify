/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HasherService } from 'src/application/services/password-hasher.service';
import { SignInUseCase } from 'src/application/use-cases/sign-in.use-case';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { JwtService } from 'src/application/services/jwt.service';
import { InMemoryCompanyRepository } from 'test/in-memory/in-memory.company-repository';
import { HasherServiceMock } from 'test/mocks/hasher-service.mock';
import { JwtServiceMock } from 'test/mocks/jwt-service.mock';
import { Company } from 'src/domain/entities/company';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('SignInUseCase', () => {
  let useCase: SignInUseCase;
  let repository: CompanyRepository;
  let hasher: HasherService;
  let jwtService: JwtService;
  let spies: any;
  let companyMock: Company;
  let hashPassword: string;

  const data = {
    name: 'Luminnus',
    email: 'luminnus@email.com',
    password: '123456',
  };

  beforeEach(async () => {
    repository = new InMemoryCompanyRepository();
    hasher = HasherServiceMock;
    jwtService = JwtServiceMock;
    useCase = new SignInUseCase(repository, hasher, jwtService);

    spies = {
      findByEmail: jest.spyOn(repository, 'findByEmail'),
      compare: jest.spyOn(hasher, 'compare'),
      sign: jest.spyOn(jwtService, 'sign'),
    };

    hashPassword = await hasher.hash(data.password);

    companyMock = new Company({ ...data, password: hashPassword });

    await repository.save(companyMock);
  });

  it('should log in to the company and return a token', async () => {
    const response = await useCase.handle(data);

    expect(spies.findByEmail).toHaveBeenCalledWith(data.email);
    expect(spies.compare).toHaveBeenCalledWith(data.password, hashPassword);
    expect(spies.sign).toHaveBeenCalledWith({
      sub: companyMock.id,
      email: companyMock.email,
      role: companyMock.role,
    });

    expect(response.accessToken).toBe('fake-token');
  });

  it('should not log in company for invalid email', async () => {
    await expect(
      useCase.handle({ ...data, email: 'lumin@email.com' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should not log in company for invalid password', async () => {
    await expect(
      useCase.handle({ ...data, password: '333333' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
