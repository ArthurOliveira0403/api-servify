import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { CompanyRepository } from 'src/domain/repositories/company.repository';
import { COMPANY_REPOSITORY } from 'src/domain/repositories/company.repository';
import { SignInDTO } from '../dtos/sign-in.dto';
import { JWT_SERVICE } from '../services/jwt.service';
import type { JwtService } from '../services/jwt.service';
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
    @Inject(JWT_SERVICE)
    private tokenService: JwtService,
  ) {}
  async handle(data: SignInDTO): Promise<string> {
    const company = await this.companyRepository.findByEmail(data.email);

    if (!company) throw new NotFoundException('Company not found');

    const isMatch = await this.passwordHasher.compare(
      data.password,
      company.password,
    );

    if (!isMatch)
      throw new UnauthorizedException('Email or password incorrects');

    const accessToken = await this.tokenService.signCompany({
      sub: company.id,
      cnpj: company.cnpj,
      email: company.email,
      role: company.role,
    });

    return accessToken;
  }
}
