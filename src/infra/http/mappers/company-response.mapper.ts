import { SubscriptionResponseMapper } from 'src/infra/http/mappers/subscription-response.mapper';
import { Company } from '../../../domain/entities/company';
import { AddressResponseMapper } from './address-response.mapper';
import { DateTransformService } from '../../../application/services/date-transform.service';

export class CompanyResponseMapper {
  static showAll(
    company: Company,
    tz: string,
    dateTransform: DateTransformService,
  ) {
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      cnpj: company.cnpj,
      address: company.address
        ? AddressResponseMapper.handle(company.address)
        : null,
      phoneNumber: company.phoneNumber,
      subscriptions: company.subscriptions
        ? SubscriptionResponseMapper.list(
            company.subscriptions,
            tz,
            dateTransform,
          )
        : [],
    };
  }

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
