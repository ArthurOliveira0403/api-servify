import { Company } from '../../../domain/entities/company';
import { AddressResponseMapper } from './address-response.mapper';

export class CompanyResponseMapper {
  static showDetails(company: Company) {
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      cnpj: company.cnpj,
      address: company.address
        ? AddressResponseMapper.handle(company.address)
        : null,
      phoneNumber: company.phoneNumber ?? null,
    };
  }
}
