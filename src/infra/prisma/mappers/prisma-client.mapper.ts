import { Client as ClientPrisma } from '@prisma/client';
import { Client as ClientDomain } from 'src/domain/entities/client';

export class PrismaClientMapper {
  static toPrisma(client: ClientDomain) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      phone_number: client.phone_number,
      created_at: client.created_at,
      updated_at: client.updated_at,
    };
  }

  static toDomain(client: ClientPrisma) {
    return new ClientDomain(client);
  }
}
