import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { CompanyRepository } from 'src/domain/repositories/company.repository';
import { SignUpDTO } from '../dtos/sign-up.dto';
import { Company } from 'src/domain/entities/company';
import { COMPANY_REPOSITORY } from 'src/domain/repositories/company.repository';
import {
  HASHER_SERVICE,
  type HasherService,
} from '../services/password-hasher.service';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(HASHER_SERVICE)
    private passwordHasher: HasherService,
  ) {}

  async handle(data: SignUpDTO) {
    const companyByEmail = await this.companyRepository.findByEmail(data.email);

    if (companyByEmail)
      throw new UnauthorizedException('The company already exist');

    const hashPassword = await this.passwordHasher.hash(data.password);

    const company = new Company({
      name: data.name,
      email: data.email,
      password: hashPassword,
    });

    await this.companyRepository.save(company);
  }
}
