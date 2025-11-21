import { toSubscriptionMapper } from 'src/application/mappers/to-subscription.mapper';
import { Company } from '../../domain/entities/company';
import { toAddressMapper } from './to-address.mapper';

export class toCompanyMapper {
  static handle(company: Company) {
    return {
      id: company.id,
      name: company.name ?? undefined,
      email: company.email,
      cnpj: company.cnpj ?? null,
      address: company.address ? toAddressMapper.handle(company.address) : null,
      logo_url: company.logo_url ?? undefined,
      phone_number: company.phone_number ?? undefined,
      subscriptions: company.subscriptions
        ? toSubscriptionMapper.handle(company.subscriptions)
        : [],
    };
  }
}
