import { Module } from '@nestjs/common';
import { CompanyModule } from '../modules/company.module';
import { AuthModule } from '../modules/auth.module';
import { SubscriptionModule } from './subscription.module';
import { PlanModule } from '../modules/plan.module';
import { AdminModule } from './admin.module';
import { AdminAuthModule } from './admin-auth.module';

@Module({
  imports: [
    CompanyModule,
    AuthModule,
    SubscriptionModule,
    PlanModule,
    AdminModule,
    AdminAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
