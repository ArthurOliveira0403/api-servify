import { Module } from '@nestjs/common';
import { AuthController } from '../http/controllers/auth.controller';
import { CompanyModule } from 'src/infra/modules/company.module';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-cases';
import { BcryptPasswordHasher } from '../crypto/bcrypt.infra';
import { PASSWORD_HASHER } from '../../application/services/password-hasher';
import { TOKEN_SERVICE } from '../../application/services/jwt.infra';
import { JwtProvider } from 'src/infra/jwt/jwt-provider.infra';
import { JwtModule } from '@nestjs/jwt';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt-strategy';

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
