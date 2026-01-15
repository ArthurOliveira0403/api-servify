import { Module } from '@nestjs/common';
import { JWT_SERVICE } from 'src/application/services/jwt.service';
import { JwtService } from '../jwt/jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCompanyStrategy } from '../jwt/strategies/jwt-company-strategy';
import { JwtAdminStrategy } from '../jwt/strategies/jwt-admin-strategy';
import { JwtAuthAdminGuard } from '../jwt/guards/jwt-auth-admin.guard';
import { JwtAuthCompanyGuard } from '../jwt/guards/jwt-auth-company.guard';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

@Module({
  providers: [
    { provide: JWT_SERVICE, useClass: JwtService },
    JwtCompanyStrategy,
    JwtAdminStrategy,
    JwtAuthCompanyGuard,
    JwtAuthAdminGuard,
  ],
  imports: [
    PassportModule,
    NestJwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JWT_SERVICE, JwtAuthAdminGuard, JwtAuthCompanyGuard],
})
export class JwtModule {}
