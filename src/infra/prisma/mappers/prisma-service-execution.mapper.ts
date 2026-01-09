import { ServiceExecution as DomainServiceExecution } from 'src/domain/entities/service-execution';
import { ServiceExecution as PrismaServiceExecution } from '@prisma/client';
import { UtcDate } from '../common/utc-date';

export class PrismaServiceExecutionMapper {
  static toPrisma(serviceExecution: DomainServiceExecution) {
    return {
      id: serviceExecution.id,
      company_id: serviceExecution.companyId,
      service_id: serviceExecution.serviceId,
      client_company_id: serviceExecution.clientCompanyId,
      price: serviceExecution.price,
      status: serviceExecution.status,
      executed_at: UtcDate.handle(serviceExecution.executedAt),
    };
  }

  static toDomain(serviceExecution: PrismaServiceExecution) {
    return new DomainServiceExecution({
      ...serviceExecution,
      companyId: serviceExecution.company_id,
      serviceId: serviceExecution.service_id,
      clientCompanyId: serviceExecution.client_company_id,
      executedAt: serviceExecution.executed_at,
    });
  }
}
