import { Module } from '@nestjs/common';
import { ClientCompanyModule } from './client-company.module';
import { ServiceModule } from './service.module';
import { SERVICE_EXECUTION_REPOSITORY } from 'src/domain/repositories/service-execution.repository';
import { PrismaServiceExecutionRepository } from '../prisma/repositories/prisma-service-execution.repository';
import { CreateServiceExecutionUseCase } from 'src/application/use-cases/create-service-execution.use-case';
import { ServiceExecutionController } from '../http/controllers/service-execution.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, ClientCompanyModule, ServiceModule],
  providers: [
    CreateServiceExecutionUseCase,
    {
      provide: SERVICE_EXECUTION_REPOSITORY,
      useClass: PrismaServiceExecutionRepository,
    },
  ],
  controllers: [ServiceExecutionController],
})
export class ServiceExecutionModule {}
