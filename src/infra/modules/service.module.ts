import { Module } from '@nestjs/common';
import { DateTrasnformModule } from './date-transform.module';
import { AuthModule } from './auth.module';
import { ClientModule } from './client.module';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { ServiceController } from '../http/controllers/service.controller';
import { SERVICE_REPOSITORY } from 'src/domain/repositories/service.repository';
import { PrismaServiceRepository } from '../prisma/repositories/prisma-service.repository';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, DateTrasnformModule, AuthModule, ClientModule],
  providers: [
    CreateServiceUseCase,
    { provide: SERVICE_REPOSITORY, useClass: PrismaServiceRepository },
  ],
  controllers: [ServiceController],
})
export class ServiceModule {}
