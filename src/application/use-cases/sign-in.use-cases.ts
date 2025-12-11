import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { CompanyRepository } from 'src/domain/repositories/company.repository';
import { SignInDTO } from '../dtos/sign-in.dto';
import { Company } from 'src/domain/entities/company';
import { COMPANY_REPOSITORY } from 'src/domain/repositories/company.repository';
import {
  HASHER_SERVICE,
  type HasherService,
} from '../services/password-hasher.service';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(HASHER_SERVICE)
    private passwordHasher: HasherService,
  ) {}

  async handle(data: SignInDTO) {
    const hashPassword = await this.passwordHasher.hash(data.password);

    const company = new Company({
      name: data.name,
      email: data.email,
      password: hashPassword,
    });

    const companyByEmail = await this.companyRepository.findByEmail(
      company.email,
    );

    if (companyByEmail)
      throw new UnauthorizedException('The company already exist');

    await this.companyRepository.save(company);
  }
}
