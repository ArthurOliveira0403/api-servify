import { Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_COMPANY_REPOSITORY,
  type ClientCompanyRepository,
} from 'src/domain/repositories/client-company.repository';
import { ListManyByCompanyClientsCompanyDTO } from '../dtos/list-many-by-company-clients-company.dto';
import { ClientCompany } from 'src/domain/entities/client-company';

@Injectable()
export class ListManyByCompanyClientsCompanyUseCase {
  constructor(
    @Inject(CLIENT_COMPANY_REPOSITORY)
    private clientCompanyRepository: ClientCompanyRepository,
  ) {}

  async handle(
    data: ListManyByCompanyClientsCompanyDTO,
  ): Promise<ClientCompany[] | []> {
    const clientsCompany =
      await this.clientCompanyRepository.findManyByCompanyId(data.companyId);

    return clientsCompany;
  }
}
