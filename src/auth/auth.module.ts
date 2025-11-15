import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CompanyModule } from 'src/company/company.module';
import { SignInUseCase } from './use-cases/sign-in.use-cases';
import { BcryptPasswordHasher } from './infra/bcrypt.infra';
import { PASSWORD_HASHER } from './infra/password-hasher';
import { TOKEN_SERVICE } from './infra/jwt.infra';
import { JwtProvider } from './infra/jwt-provider.infra';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE, useClass: JwtProvider },
  ],
  imports: [
    CompanyModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '30s' },
    }),
  ],
})
export class AuthModule {}
