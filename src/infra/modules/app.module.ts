import { Module } from '@nestjs/common';
import { CompanyModule } from '../modules/company.module';
import { AuthModule } from '../modules/auth.module';
import { SubscriptionModule } from './subscription.module';
import { PlanModule } from '../modules/plan.module';
import { AdminModule } from './admin.module';
import { AdminAuthModule } from './admin-auth.module';
import { ServiceModule } from './service.module';
import { ClientModule } from './client.module';
import { HasherModule } from './hasher.module';
import { JwtModule } from './jwt.module';
import { ClientCompanyModule } from './client-company.module';
import { ServiceExecutionModule } from './service-execution.module';
import { InvoiceModule } from './invoice.module';
import { PdfModule } from './pdf.module';

@Module({
  imports: [
    CompanyModule,
    AuthModule,
    ServiceModule,
    ClientModule,
    ClientCompanyModule,
    ServiceExecutionModule,
    InvoiceModule,
    PdfModule,
    PlanModule,
    SubscriptionModule,
    AdminAuthModule,
    AdminModule,
    HasherModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
