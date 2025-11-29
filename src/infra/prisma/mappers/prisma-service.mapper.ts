import { Service as DomainService } from 'src/domain/entities/service';
import { Service as PrismaService } from '@prisma/client';

export class PrismaServiceMapper {
  static toPrisma(service: DomainService) {
    return {
      id: service.id,
      company_id: service.company_id,
      client_id: service.client_id,
      price: service.price,
      description: service.description,
      status: service.status,
      start_at: service.start_at,
      finished_at: service.finished_at,
      created_at: service.created_at,
      updated_at: service.update_at,
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
