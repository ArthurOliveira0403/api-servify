import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [CompanyModule, AuthModule, SubscriptionModule, PlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
