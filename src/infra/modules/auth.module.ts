import { Module } from '@nestjs/common';
import { AuthController } from '../http/controllers/auth.controller';
import { CompanyModule } from 'src/infra/modules/company.module';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-cases';
import { BcryptPasswordHasher } from '../crypto/bcrypt.infra';
import { PASSWORD_HASHER } from '../../application/services/password-hasher.service';
import { JWT_SERVICE } from '../../application/services/jwt.service';
import { JwtProvider } from 'src/infra/jwt/jwt-provider.infra';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtCompanyStrategy } from '../jwt/strategies/jwt-company-strategy';

@Module({
  controllers: [AuthController],
  providers: [
    JwtCompanyStrategy,
    SignInUseCase,
    SignUpUseCase,
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: JWT_SERVICE, useClass: JwtProvider },
  ],
  imports: [
    CompanyModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JWT_SERVICE],
})
export class AuthModule {}
