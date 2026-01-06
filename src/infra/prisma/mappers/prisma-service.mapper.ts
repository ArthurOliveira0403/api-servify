import { Service as DomainService } from 'src/domain/entities/service';
import { Service as PrismaService } from '@prisma/client';
import { UtcDate } from '../common/utc-date';

export class PrismaServiceMapper {
  static toPrisma(service: DomainService) {
    return {
      id: service.id,
      company_id: service.companyId,
      client_id: service.clientId,
      price: service.price,
      description: service.description,
      status: service.status,
      start_at: service.startAt ? UtcDate.handle(service.startAt) : undefined,
      finished_at: service.finishedAt
        ? UtcDate.handle(service.finishedAt)
        : undefined,
      created_at: service.createdAt
        ? UtcDate.handle(service.createdAt)
        : undefined,
      updated_at: service.update_at
        ? UtcDate.handle(service.update_at)
        : undefined,
    };
  }

  static toDomain(service: PrismaService) {
    return new DomainService({
      ...service,
      clientId: service.client_id,
      companyId: service.company_id,
      startAt: service.start_at ?? undefined,
      finishedAt: service.finished_at ?? undefined,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    });
  }
}
