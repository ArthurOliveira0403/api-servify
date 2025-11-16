import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { CompanyRepository } from 'src/company/repository/company.repository';
import { COMPANY_REPOSITORY } from 'src/company/repository/company.repository';
import { SignUpDTO } from '../dtos/sign-up.dto';
import { TOKEN_SERVICE } from '../infra/jwt/jwt.infra';
import type { Jwt } from '../infra/jwt/jwt.infra';
import type { PasswordHasher } from '../infra/password-hasher/password-hasher';
import { PASSWORD_HASHER } from '../infra/password-hasher/password-hasher';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository,
    @Inject(PASSWORD_HASHER)
    private passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE)
    private tokenService: Jwt,
  ) {}
  async handle(data: SignUpDTO) {
    const company = await this.companyRepository.findByEmail(data.email);

    if (!company) throw new NotFoundException('Company not found');

    const isMatch = await this.passwordHasher.compare(
      data.password,
      company.password,
    );

    if (!isMatch)
      throw new UnauthorizedException('Email or password incorrects');

    const token = this.tokenService.sign({
      sub: company.id,
      email: company.email,
    });

    return { acessToken: token };
  }
}
