import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatedCompanyDTO } from '../dtos/update-company.dto';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/repositories/company.repository';
import { CompanyResponseMapper } from '../mappers/company-response.mapper';
import { Company } from '../../domain/entities/company';
import {
  DATE_TRANSFORM,
  type DateTransformService,
} from '../services/date-transform.service';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(DATE_TRANSFORM)
    private dateTrasnform: DateTransformService,
  ) {}

  async handle(id: string, data: UpdatedCompanyDTO, tz: string) {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new NotFoundException('Company not found');

    company.update(data);

    await this.companyRepository.update(company);

    const companyUpdated = await this.companyRepository.findById(company.id);

    return CompanyResponseMapper.handle(
      companyUpdated as Company,
      tz,
      this.dateTrasnform,
    );
  }
}
