import { Client } from 'src/domain/entities/client';
import { ClientCompany } from 'src/domain/entities/client-company';

export class ClientCompanyResponseMapper {
  static handle(clientCompany: ClientCompany, client: Client) {
    return {
      id: clientCompany.id,
      clientId: clientCompany.clientId,
      fullName: client.fullName,
      internationalId: client.internationalId,
      email: clientCompany.email ?? null,
      phone: clientCompany.phone ?? null,
    };
  }
}
