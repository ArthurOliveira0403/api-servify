import { Inject, UnauthorizedException } from '@nestjs/common';
import { ADMIN_REPOSITORY } from 'src/domain/repositories/admin.repository';
import type { AdminRepository } from 'src/domain/repositories/admin.repository';
import { SignInAdminDTO } from '../dtos/sign-in-admin.dto';
import { JWT_SERVICE } from '../services/jwt.service';
import type { JwtService } from '../services/jwt.service';

export class SignInAdminUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private adminRepository: AdminRepository,
    @Inject(JWT_SERVICE)
    private jwtService: JwtService,
  ) {}

  async handle(data: SignInAdminDTO): Promise<{ accessToken: string }> {
    const adminExist = await this.adminRepository.findByEmail(data.email);

    if (!adminExist) throw new UnauthorizedException('Acesso negado');

    const accessToken = await this.jwtService.signAdmin({
      sub: adminExist.id,
      email: adminExist.email,
      role: adminExist.role,
    });

    return { accessToken };
  }
}
