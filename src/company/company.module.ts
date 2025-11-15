import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaCompanyRepository } from './repository/prisma.company.repository';
import { COMPANY_REPOSITORY } from './repository/company.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    { provide: COMPANY_REPOSITORY, useClass: PrismaCompanyRepository },
  ],
  exports: [COMPANY_REPOSITORY],
})
export class CompanyModule {}
