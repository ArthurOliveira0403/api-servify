import { Module } from '@nestjs/common';
import { CompanyModule } from '../modules/company.module';
import { AuthModule } from '../modules/auth.module';
import { SubscriptionModule } from './subscription.module';
import { PlanModule } from '../modules/plan.module';
import { AdminModule } from './admin.module';
import { AdminAuthModule } from './admin-auth.module';
import { ServiceModule } from './service.module';
import { ClientModule } from './client.module';

@Module({
  imports: [
    CompanyModule,
    AuthModule,
    SubscriptionModule,
    PlanModule,
    AdminModule,
    AdminAuthModule,
    ServiceModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
