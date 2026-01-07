import { Service as DomainService } from 'src/domain/entities/service';
import { Service as PrismaService } from '@prisma/client';
import { UtcDate } from '../common/utc-date';

export class PrismaServiceMapper {
  static toPrisma(service: DomainService) {
    return {
      id: service.id,
      company_id: service.companyId,
      name: service.name,
      base_price: service.basePrice,
      description: service.description,
      created_at: UtcDate.handle(service.createdAt),
      updated_at: UtcDate.handle(service.update_at),
    };
  }

  static toDomain(service: PrismaService) {
    return new DomainService({
      ...service,
      companyId: service.company_id,
      basePrice: service.base_price,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    });
  }
}
