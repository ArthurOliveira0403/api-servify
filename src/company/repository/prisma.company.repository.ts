import { PrismaService } from 'src/database/database.service';
import { Company } from '../entities/company';
import { CompanyRepository } from './company.repository';
import { Injectable } from '@nestjs/common';
import { Address } from '../entities/address';
import { Subscription } from 'src/subscription/entities/subscription';
import { StatusConverter } from './helper/status-converter.helper';

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
                zip_code: company.address.zip_code,
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

    if (!company) return null;

    const companyFound = new Company({
      id: company.id,
      name: company.name ?? undefined,
      email: company.email,
      password: company.password,
      cnpj: company.cnpj ?? undefined,
      address: company.address
        ? new Address({ ...company.address, company_id: company.id })
        : undefined,
      logo_url: company.logo_url ?? undefined,
      phone_number: company.phone_number ?? undefined,
      subscriptions: company.subscriptions
        ? company.subscriptions.map(
            (s) =>
              new Subscription({
                ...s,
                company_id: company.id,
                status: StatusConverter.handle(s.status),
              }),
          )
        : [],
      created_at: company.created_at,
      updated_at: company.updated_at,
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
      id: company.id,
      name: company.name ?? undefined,
      email: company.email,
      password: company.password,
      cnpj: company.cnpj ?? undefined,
      address: company.address
        ? new Address({ ...company.address, company_id: company.id })
        : undefined,
      logo_url: company.logo_url ?? undefined,
      phone_number: company.phone_number ?? undefined,
      subscriptions: company.subscriptions
        ? company.subscriptions.map(
            (s) =>
              new Subscription({
                ...s,
                company_id: company.id,
                status: StatusConverter.handle(s.status),
              }),
          )
        : [],
      created_at: company.created_at,
      updated_at: company.updated_at,
    });

    return companyFound;
  }

  async update(company: Company): Promise<void> {
    await this.prisma.company.update({
      where: { id: company.id },
      data: {
        name: company.name,
        cnpj: company.cnpj,
        address: {
          update: {
            country: company.address?.country,
            state: company.address?.state,
            city: company.address?.city,
            street: company.address?.street,
            number: company.address?.number,
            zip_code: company.address?.zip_code,
            complement: company.address?.complement,
          },
        },
        logo_url: company.logo_url,
        phone_number: company.phone_number,
      },
      include: { address: true, subscriptions: true },
    });
  }
}
