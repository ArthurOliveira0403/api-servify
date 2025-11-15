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
        name: company.name,
        email: company.email,
        password: company.password,
        cnpj: company.cnpj,
        created_at: company.created_at,
        updated_at: company.updated_at,
      },
    });
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({ where: { email } });
    return company as unknown as Company;
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({ where: { cnpj } });
    return company as unknown as Company;
  }
}
