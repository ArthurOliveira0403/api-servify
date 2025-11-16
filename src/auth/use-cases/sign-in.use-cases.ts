import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { CompanyRepository } from 'src/company/repository/company.repository';
import { SignInDTO } from '../dtos/sign-in.dto';
import { Company } from 'src/company/entities/company';
import { COMPANY_REPOSITORY } from 'src/company/repository/company.repository';
import { PASSWORD_HASHER } from '../infra/password-hasher/password-hasher';
import type { PasswordHasher } from '../infra/password-hasher/password-hasher';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(PASSWORD_HASHER)
    private passwordHasher: PasswordHasher,
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
