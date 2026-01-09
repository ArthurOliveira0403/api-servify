import { ClientCompany } from 'src/domain/entities/client-company';

export class ClientCompanyResponseMapper {
  static handle(clientCompany: ClientCompany) {
    return {
      id: clientCompany.id,
      clientId: clientCompany.clientId,
      email: clientCompany.email,
      phone: clientCompany.phone,
    };
  }
}
