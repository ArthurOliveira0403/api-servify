import { SubscriptionResponseMapper } from 'src/application/mappers/subscription-response.mapper';
import { Company } from '../../domain/entities/company';
import { AddressResponseMapper } from './address-response.mapper';
import { DateTransformService } from '../services/date-transform.service';

export class CompanyResponseMapper {
  static handle(
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
      phone_number: company.phone_number,
      subscriptions: company.subscriptions
        ? SubscriptionResponseMapper.list(
            company.subscriptions,
            tz,
            dateTransform,
          )
        : [],
    };
  }
}
