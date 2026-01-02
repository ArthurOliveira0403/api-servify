import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResponseMapper } from 'src/application/mappers/company-response.mapper';
import { DateTransformService } from 'src/application/services/date-transform.service';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import { Company } from 'src/domain/entities/company';
import { CompanyController } from 'src/infra/http/controllers/company.controller';
import { dateTransformMock } from 'test/utils/mocks/date-transform.mock';

const companyMock = new Company({
  email: 'luminnus@email.com',
  password: '123456',
  cnpj: '12213421421',
  phone_number: '084 9 9999-9999',
});

const updateCompanyUseCaseMock = {
  provide: UpdateCompanyUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

describe('companyController', () => {
  let companyController: CompanyController;
  let updateCompanyUseCase: UpdateCompanyUseCase;
  let dateTransform: DateTransformService;

  const company = companyMock;

  const data = {
    cnpj: '12213421421',
    phone_number: '084 9 9999-9999',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [updateCompanyUseCaseMock],
      controllers: [CompanyController],
    }).compile();

    companyController = moduleRef.get<CompanyController>(CompanyController);
    updateCompanyUseCase =
      moduleRef.get<UpdateCompanyUseCase>(UpdateCompanyUseCase);

    dateTransform = dateTransformMock;
  });

  it('should update a company', async () => {
    jest
      .spyOn(updateCompanyUseCase, 'handle')
      .mockResolvedValue(
        CompanyResponseMapper.handle(companyMock, 'Brasilia', dateTransform),
      );

    const response = await companyController.update(
      'Brasilia',
      {
        id: company.id,
        email: company.email,
        role: company.role,
      },
      data,
    );

    expect(response.message).toEqual('Company successfully updated');
    expect(response.company).toMatchObject({
      email: company.email,
      cnpj: company.cnpj,
      phone_number: company.phone_number,
    });
  });

  it('should not update a not found company', async () => {
    jest
      .spyOn(updateCompanyUseCase, 'handle')
      .mockRejectedValue(new UnauthorizedException());

    await expect(
      companyController.update(
        'Brasilia',
        {
          id: company.id,
          email: company.email,
          role: company.role,
        },
        data,
      ),
    ).rejects.toThrow(UnauthorizedException);
  });
});
