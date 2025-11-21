import { Company } from 'src/domain/entities/company';

export class PrismaCompanyMapper {
  static toPrismaCreate(company: Company) {
    return {
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
    };
  }

  static toPrismaUpdate(company: Company) {
    return {
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
    };
  }
}
