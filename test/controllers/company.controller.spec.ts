/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DATE_TRANSFORM_SERVICE } from 'src/application/services/date-transform.service';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import { Company } from 'src/domain/entities/company';
import { CompanyController } from 'src/infra/http/controllers/company.controller';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';

const companyMock = new Company({
  name: 'Luminnus',
  cnpj: '12213421421',
  email: 'luminnus@email.com',
  password: '123456',
  phoneNumber: '084 9 9999-9999',
});

const updateCompanyUseCaseMock = {
  provide: UpdateCompanyUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

describe('companyController', () => {
  let companyController: CompanyController;
  let spies: any;

  const company = companyMock;

  const data = {
    cnpj: '12213421421',
    phoneNumber: '084 9 9999-9999',
  };

  const user: ReturnCompanyUser = {
    id: company.id,
    cnpj: company.cnpj,
    email: company.email,
    role: company.role,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        updateCompanyUseCaseMock,
        { provide: DATE_TRANSFORM_SERVICE, useValue: dateTransformMock },
      ],
      controllers: [CompanyController],
    }).compile();

    companyController = moduleRef.get<CompanyController>(CompanyController);
    const updateCompanyUseCase =
      moduleRef.get<UpdateCompanyUseCase>(UpdateCompanyUseCase);

    spies = {
      updateCompanyUseCase: {
        handle: jest.spyOn(updateCompanyUseCase, 'handle'),
      },
    };
  });

  it('should update a company', async () => {
    spies.updateCompanyUseCase.handle.mockResolvedValue(companyMock);

    const response = await companyController.update(user, data);

    expect(spies.updateCompanyUseCase.handle).toHaveBeenCalledWith(
      company.id,
      data,
    );

    expect(response.message).toEqual('Company successfully updated');
  });

  it('should throw UnauthorizedException when user is not authorized', async () => {
    spies.updateCompanyUseCase.handle.mockRejectedValue(
      new UnauthorizedException(),
    );

    await expect(companyController.update(user, data)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(spies.updateCompanyUseCase.handle).toHaveBeenCalledWith(
      company.id,
      data,
    );
  });
});
