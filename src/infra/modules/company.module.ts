import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { PrismaCompanyRepository } from '../prisma/repositories/prisma-company.repository';
import { COMPANY_REPOSITORY } from '../../domain/repositories/company.repository';
import { CompanyController } from '../http/controllers/company.controller';
import { UpdateCompanyUseCase } from '../../application/use-cases/update-company.use-case';
import { JwtModule } from './jwt.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [
    UpdateCompanyUseCase,
    { provide: COMPANY_REPOSITORY, useClass: PrismaCompanyRepository },
  ],
  exports: [COMPANY_REPOSITORY],
  controllers: [CompanyController],
})
export class CompanyModule {}
