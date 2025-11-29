import { Client } from 'src/domain/entities/client';
import { ClientRepository } from 'src/domain/repositories/client.repository';
import { PrismaService } from '../prisma.service';
import { PrismaClientMapper } from '../mappers/prisma-client.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async save(client: Client): Promise<void> {
    const row = PrismaClientMapper.toPrisma(client);

    await this.prisma.client.create({
      data: row,
    });
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({ where: { cpf } });

    if (!client) return null;

    return PrismaClientMapper.toDomain(client);
  }
}
