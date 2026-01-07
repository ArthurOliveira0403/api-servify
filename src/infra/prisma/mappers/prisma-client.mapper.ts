import { Client as ClientPrisma } from '@prisma/client';
import { Client as ClientDomain } from 'src/domain/entities/client';
import { UtcDate } from '../common/utc-date';

export class PrismaClientMapper {
  static toPrisma(client: ClientDomain) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      international_id: client.internationalId,
      phone_number: client.phoneNumber,
      created_at: UtcDate.handle(client.createdAt),
      updated_at: UtcDate.handle(client.updatedAt),
    };
  }

  static toDomain(client: ClientPrisma) {
    return new ClientDomain({
      ...client,
      internationalId: client.international_id,
      phoneNumber: client.phone_number,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    });
  }
}
