import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaCompanyRepository } from './repository/prisma.company.repository';
import { COMPANY_REPOSITORY } from './repository/company.repository';
import { CompanyController } from './company.controller';
import { UpdateCompanyUseCase } from './use-cases/updated-company.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpdateCompanyUseCase,
    { provide: COMPANY_REPOSITORY, useClass: PrismaCompanyRepository },
  ],
  exports: [COMPANY_REPOSITORY],
  controllers: [CompanyController],
})
export class CompanyModule {}
