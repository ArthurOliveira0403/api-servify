import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompanyDTO } from '../dtos/update-company.dto';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/repositories/company.repository';
import {
  DATE_TRANSFORM_SERVICE,
  type DateTransformService,
} from '../services/date-transform.service';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(DATE_TRANSFORM_SERVICE)
    private dateTrasformService: DateTransformService,
  ) {}

  async handle(id: string, data: UpdateCompanyDTO): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new NotFoundException('Company not found');

    company.update({ ...data, updatedAt: this.dateTrasformService.nowUTC() });

    await this.companyRepository.update(company);
  }
}
