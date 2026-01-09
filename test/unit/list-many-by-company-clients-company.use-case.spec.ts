/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ClientCompany } from 'src/domain/entities/client-company';
import { ListManyByCompanyClientsCompanyDTO } from 'src/application/dtos/list-many-by-company-clients-company.dto';
import { ListManyByCompanyClientsCompanyUseCase } from 'src/application/use-cases/list-many-by-company-clients-company';
import { InMemoryClientCompanyRepository } from 'test/utils/in-memory/in-memory.client-company.repository';

describe('ListManyByCompanyClientsCompanyUseCase', () => {
  let useCase: ListManyByCompanyClientsCompanyUseCase;
  let repository: InMemoryClientCompanyRepository;
  let spies: any;

  const clientsForRepository = [
    {
      id: 'client-company-1',
      clientId: 'client-1',
      companyId: 'company-123',
      email: 'email@email.com',
      phone: '1234567890',
    } as ClientCompany,
    {
      id: 'client-company-2',
      clientId: 'client-2',
      companyId: 'company-123',
      email: 'email2@email.com',
      phone: '0987654321',
    } as ClientCompany,
    {
      id: 'client-company-3',
      clientId: 'client-3',
      companyId: 'company-123',
      email: 'newEmail@email.com',
      phone: '123456',
    } as ClientCompany,
  ];

  const data: ListManyByCompanyClientsCompanyDTO = {
    companyId: 'company-123',
  };

  beforeEach(() => {
    repository = new InMemoryClientCompanyRepository();
    useCase = new ListManyByCompanyClientsCompanyUseCase(repository);

    spies = {
      clientCompanyRepository: {
        findManyByCompanyId: jest.spyOn(repository, 'findManyByCompanyId'),
      },
    };
  });

  it('should list many clients company by company id', async () => {
    await repository.save(clientsForRepository[0]);
    await repository.save(clientsForRepository[1]);
    await repository.save(clientsForRepository[2]);

    const clientsCompany = await useCase.handle(data);

    expect(
      spies.clientCompanyRepository.findManyByCompanyId,
    ).toHaveBeenCalledWith(data.companyId);
    expect(clientsCompany).toEqual(repository.clientsCompany);
  });
});
