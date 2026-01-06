import { PrismaService } from 'src/infra/prisma/prisma.service';
import { Company } from 'src/domain/entities/company';
import { CompanyRepository } from 'src/domain/repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { Address } from 'src/domain/entities/address';
import { Subscription } from 'src/domain/entities/subscription';
import { PrismaCompanyMapper } from '../mappers/prisma-company.mapper';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async save(company: Company): Promise<void> {
    const row = PrismaCompanyMapper.toPrismaCreate(company);

    await this.prisma.company.create({
      data: { ...row },
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

    if (!company) return null;

    const companyFound = new Company({
      ...company,
      name: company.name ?? undefined,
      cnpj: company.cnpj ?? undefined,
      address: company.address
        ? new Address({ ...company.address, company_id: company.id })
        : undefined,
      phoneNumber: company.phone_number ?? undefined,
      subscriptions: company.subscriptions
        ? company.subscriptions.map(
            (s) =>
              new Subscription({
                ...s,
                companyId: company.id,
                planId: s.plan_id,
                startDate: s.start_date,
                endDate: s.end_date,
                renewalDate: s.renewal_date,
              }),
          )
        : [],
    });

    return companyFound;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { address: true, subscriptions: true },
    });

    if (!company) return null;

    const companyFound = new Company({
      ...company,
      name: company.name ?? undefined,
      cnpj: company.cnpj ?? undefined,
      address: company.address
        ? new Address({ ...company.address, company_id: company.id })
        : undefined,
      phoneNumber: company.phone_number ?? undefined,
      subscriptions: company.subscriptions
        ? company.subscriptions.map(
            (s) =>
              new Subscription({
                ...s,
                companyId: company.id,
                planId: s.plan_id,
                startDate: s.start_date,
                endDate: s.end_date,
                renewalDate: s.renewal_date,
              }),
          )
        : [],
    });

    return companyFound;
  }

  async update(company: Company): Promise<void> {
    const row = PrismaCompanyMapper.toPrismaUpdate(company);

    await this.prisma.company.update({
      where: { id: company.id },
      data: { ...row },
      include: { address: true, subscriptions: true },
    });
  }
}
