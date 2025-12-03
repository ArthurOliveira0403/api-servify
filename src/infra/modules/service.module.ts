import { Module } from '@nestjs/common';
import { DateTrasnformModule } from './date-transform.module';
import { AuthModule } from './auth.module';
import { ClientModule } from './client.module';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { ServiceController } from '../http/controllers/service.controller';
import { SERVICE_REPOSITORY } from 'src/domain/repositories/service.repository';
import { PrismaServiceRepository } from '../prisma/repositories/prisma-service.repository';
import { DatabaseModule } from './database.module';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';

@Module({
  imports: [DatabaseModule, DateTrasnformModule, AuthModule, ClientModule],
  providers: [
    CreateServiceUseCase,
    ListServicesUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
    { provide: SERVICE_REPOSITORY, useClass: PrismaServiceRepository },
  ],
  controllers: [ServiceController],
})
export class ServiceModule {}
