import { PrismaService } from 'src/database/database.service';
import { Company } from '../entities/company';
import { CompanyRepository } from './company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async save(company: Company): Promise<void> {
    await this.prisma.company.create({
      data: {
        id: company.id,
        name: company.name ?? undefined,
        email: company.email,
        password: company.password,
        cnpj: company.cnpj ?? undefined,
        address: company.address
          ? {
              create: {
                country: company.address.country,
                state: company.address.state,
                city: company.address.city,
                street: company.address.street,
                number: company.address.number,
                complement: company.address.complement,
              },
            }
          : undefined,
        logo_url: company.logo_url ?? undefined,
        phone_number: company.phone_number ?? undefined,
        created_at: company.created_at,
        updated_at: company.updated_at,
      },
      include: {
        address: true,
        subscriptions: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { email },
      include: { address: true, subscriptions: true },
    });
    return company as unknown as Company;
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { cnpj },
      include: { address: true, subscriptions: true },
    });
    return company as unknown as Company;
  }
}
