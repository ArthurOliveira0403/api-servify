import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CompanyModule } from 'src/company/company.module';
import { SignInUseCase } from './use-cases/sign-in.use-cases';
import { BcryptPasswordHasher } from './infra/password-hasher/bcrypt.infra';
import { PASSWORD_HASHER } from './infra/password-hasher/password-hasher';
import { TOKEN_SERVICE } from './infra/jwt/jwt.infra';
import { JwtProvider } from './infra/jwt/jwt-provider.infra';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from './use-cases/sign-up.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infra/jwt/strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    SignInUseCase,
    SignUpUseCase,
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE, useClass: JwtProvider },
  ],
  imports: [
    CompanyModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
