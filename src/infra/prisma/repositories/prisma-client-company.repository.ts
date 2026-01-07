import { Injectable } from '@nestjs/common';
import { ClientCompany } from 'src/domain/entities/client-company';
import { ClientCompanyRepository } from 'src/domain/repositories/client-company.repository';
import { PrismaService } from '../prisma.service';
import { PrismaClientCompanyMapper } from '../mappers/prisma-client-company.mapper';

export const CLIENT_COMPANY_REPOSITORY = 'CLIENT_COMPANY_REPOSITORY';

@Injectable()
export class PrismaClientCompanyRepository implements ClientCompanyRepository {
  constructor(private prisma: PrismaService) {}

  async save(clientCompany: ClientCompany): Promise<void> {
    const raw = PrismaClientCompanyMapper.toPrisma(clientCompany);

    await this.prisma.clientCompany.create({ data: { ...raw } });
  }

  async findRelation(
    companyId: string,
    clientId: string,
  ): Promise<ClientCompany | null> {
    const clientCompany = await this.prisma.clientCompany.findFirst({
      where: { company_id: companyId, client_id: clientId },
    });

    return clientCompany
      ? PrismaClientCompanyMapper.toDomain(clientCompany)
      : null;
  }

  async findManyByCompanyId(companyId: string): Promise<ClientCompany[] | []> {
    const clientsCompany = await this.prisma.clientCompany.findMany({
      where: { company_id: companyId },
    });

    if (!clientsCompany) return [];

    const raw = clientsCompany.map((c) =>
      PrismaClientCompanyMapper.toDomain(c),
    );

    return raw;
  }
}
