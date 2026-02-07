import { Module } from '@nestjs/common';
import { AuthController } from '../http/controllers/auth.controller';
import { CompanyModule } from 'src/infra/modules/company.module';
import { SignUpUseCase } from '../../application/use-cases/sign-up.use-case';
import { SignInUseCase } from '../../application/use-cases/sign-in.use-case';
import { JwtModule } from './jwt.module';
import { HasherModule } from './hasher.module';
import { DateTrasnformModule } from './date-transform.module';

@Module({
  imports: [CompanyModule, HasherModule, JwtModule, DateTrasnformModule],
  controllers: [AuthController],
  providers: [SignInUseCase, SignUpUseCase],
})
export class AuthModule {}
