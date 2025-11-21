import { Module } from '@nestjs/common';
import { CompanyModule } from '../modules/company.module';
import { AuthModule } from '../modules/auth.module';
import { SubscriptionModule } from './subscription.module';
import { PlanModule } from '../modules/plan.module';

@Module({
  imports: [CompanyModule, AuthModule, SubscriptionModule, PlanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
