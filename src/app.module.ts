import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CompanyModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
