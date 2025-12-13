import { Module } from '@nestjs/common';
import { SignInAdminUseCase } from 'src/application/use-cases/sign-in-admin.use-case';
import { AdminAuthController } from '../http/controllers/admin-auth.controller';
import { AdminModule } from './admin.module';
import { AuthModule } from './auth.module';
import { JwtModule } from './jwt.module';

@Module({
  imports: [AdminModule, AuthModule, JwtModule],
  controllers: [AdminAuthController],
  providers: [SignInAdminUseCase],
})
export class AdminAuthModule {}
