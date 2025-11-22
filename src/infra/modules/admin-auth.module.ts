import { Module } from '@nestjs/common';
import { SignUpAdminUseCase } from 'src/application/use-cases/sign-up-admin.use-case';
import { JwtAdminStrategy } from '../jwt/strategies/jwt-admin-strategy';
import { AdminAuthController } from '../http/controllers/admin-auth.controller';
import { AdminModule } from './admin.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [AdminModule, AuthModule],
  controllers: [AdminAuthController],
  providers: [SignUpAdminUseCase, JwtAdminStrategy],
})
export class AdminAuthModule {}
