import { Service as DomainService } from 'src/domain/entities/service';
import { Service as PrismaService } from '@prisma/client';
import { UtcDate } from '../common/utc-date';

export class PrismaServiceMapper {
  static toPrisma(service: DomainService) {
    return {
      id: service.id,
      company_id: service.company_id,
      client_id: service.client_id,
      price: service.price,
      description: service.description,
      status: service.status,
      start_at: service.start_at ? UtcDate.handle(service.start_at) : undefined,
      finished_at: service.finished_at
        ? UtcDate.handle(service.finished_at)
        : undefined,
      created_at: service.created_at
        ? UtcDate.handle(service.created_at)
        : undefined,
      updated_at: service.update_at
        ? UtcDate.handle(service.update_at)
        : undefined,
    };
  }

  static toDomain(service: PrismaService) {
    return new DomainService({
      ...service,
      start_at: service.start_at ?? undefined,
      finished_at: service.finished_at ?? undefined,
    });
  }
}
