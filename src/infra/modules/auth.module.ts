import { Module } from '@nestjs/common';
import { AuthController } from '../http/controllers/auth.controller';
import { CompanyModule } from 'src/infra/modules/company.module';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-cases';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { JwtModule } from './jwt.module';
import { HasherModule } from './hasher.module';

@Module({
  controllers: [AuthController],
  providers: [SignInUseCase, SignUpUseCase],
  imports: [CompanyModule, HasherModule, JwtModule],
})
export class AuthModule {}
