import { ClientCompany } from '../entities/client-company';

export interface ClientCompanyRepository {
  save(clientCompany: ClientCompany): Promise<void>;
  findRelation(
    companyId: string,
    clientId: string,
  ): Promise<ClientCompany | null>;
  findManyByCompanyId(companyId: string): Promise<ClientCompany[] | []>;
}
