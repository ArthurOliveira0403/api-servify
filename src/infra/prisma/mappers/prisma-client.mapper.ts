import { Client as ClientPrisma } from '@prisma/client';
import { Client as ClientDomain } from 'src/domain/entities/client';

export class PrismaClientMapper {
  static toPrisma(client: ClientDomain) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      phone_number: client.phoneNumber,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };
  }

  static toDomain(client: ClientPrisma) {
    return new ClientDomain({
      id: client.id,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
      phoneNumber: client.phone_number,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    });
  }
}
