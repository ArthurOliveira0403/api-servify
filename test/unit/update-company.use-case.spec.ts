/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import { Address } from 'src/domain/entities/address';
import { Company } from 'src/domain/entities/company';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { InMemoryCompanyRepository } from 'test/utils/in-memory/in-memory.company-repository';

describe('UpdateCompanyUseCase', () => {
  let useCase: UpdateCompanyUseCase;
  let companyRepository: CompanyRepository;
  let spies: any;

  const companyMock = new Company({
    id: '1',
    name: 'Luminnus',
    email: 'luminnus@email.com',
    password: 'hashedPassword',
  });

  const companyMockWithAddress = new Company({
    id: '2',
    name: 'Luminnus',
    email: 'luminnus@email.com',
    password: 'hashedPassword',
    address: new Address({
      company_id: '2',
      country: 'Brazil',
      state: 'Rio de janeiro',
      number: '12',
    }),
  });

  const data = {
    address: {
      city: 'São Paulo',
      country: 'Brazil',
      number: '781',
    },
    cnpj: '12213421421',
    phoneNumber: '084 9 9999-9999',
  };

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    useCase = new UpdateCompanyUseCase(companyRepository);

    spies = {
      repository: {
        findById: jest.spyOn(companyRepository, 'findById'),
        update: jest.spyOn(companyRepository, 'update'),
      },
    };
  });

  it('should update a company that already has an address', async () => {
    await companyRepository.save(companyMockWithAddress);

    const response = await useCase.handle(companyMockWithAddress.id, data);

    expect(spies.repository.findById).toHaveBeenCalledWith(
      companyMockWithAddress.id,
    );

    const updatedCompany = await companyRepository.findById(
      companyMockWithAddress.id,
    );

    expect(updatedCompany?.cnpj).toBe(data.cnpj);
    expect(updatedCompany?.phoneNumber).toBe(data.phoneNumber);
    expect(updatedCompany?.address).toMatchObject(data.address);

    expect(response).toMatchObject({
      id: companyMockWithAddress.id,
      email: companyMockWithAddress.email,
      cnpj: data.cnpj,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });
  });

  it('should create a address when company does not have one', async () => {
    await companyRepository.save(companyMock);

    const response = await useCase.handle(companyMock.id, data);

    expect(spies.repository.findById).toHaveBeenCalledWith(companyMock.id);

    const updatedCompany = await companyRepository.findById(companyMock.id);

    expect(updatedCompany?.cnpj).toBe(data.cnpj);
    expect(updatedCompany?.phoneNumber).toBe(data.phoneNumber);
    expect(updatedCompany?.address).toMatchObject(data.address);

    expect(response).toMatchObject({
      id: companyMock.id,
      email: companyMock.email,
      cnpj: data.cnpj,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });
  });

  it('should not update for not found company', async () => {
    await expect(useCase.handle(companyMock.id, data)).rejects.toThrow(
      NotFoundException,
    );

    expect(spies.repository.findById).toHaveBeenCalledWith(companyMock.id);
  });
});
