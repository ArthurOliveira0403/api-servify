import { Inject, UnauthorizedException } from '@nestjs/common';
import { ADMIN_REPOSITORY } from 'src/domain/repositories/admin.repository';
import type { AdminRepository } from 'src/domain/repositories/admin.repository';
import { SignUpAdminDTO } from '../dtos/sign-up-admin.dto';
import { JWT_SERVICE } from '../services/jwt.service';
import { JwtProvider } from 'src/infra/jwt/jwt-provider.infra';

export class SignUpAdminUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private adminRepository: AdminRepository,
    @Inject(JWT_SERVICE)
    private jwtService: JwtProvider,
  ) {}

  async handle(data: SignUpAdminDTO) {
    const adminExist = await this.adminRepository.findByEmail(data.email);

    if (!adminExist) throw new UnauthorizedException('Acesso negado');

    const token = this.jwtService.sign({
      sub: adminExist.id,
      email: adminExist.email,
      role: adminExist.role,
    });

    return { acessToken: token };
  }
}
