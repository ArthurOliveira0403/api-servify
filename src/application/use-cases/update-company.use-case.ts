import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompanyDTO } from '../dtos/update-company.dto';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/repositories/company.repository';
import { Company } from 'src/domain/entities/company';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
  ) {}

  async handle(id: string, data: UpdateCompanyDTO): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new NotFoundException('Company not found');

    company.update(data);

    await this.companyRepository.update(company);

    const companyUpdated = await this.companyRepository.findById(company.id);

    return companyUpdated!;
  }
}
