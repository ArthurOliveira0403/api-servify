import { Client } from 'src/domain/entities/client';
import { ClientCompany } from 'src/domain/entities/client-company';

export abstract class ClientCompanyWithClientDTO {
  clientCompany: ClientCompany;
  client: Client;
}
