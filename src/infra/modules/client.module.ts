import { Module } from '@nestjs/common';
import { CLIENT_REPOSITORY } from 'src/domain/repositories/client.repository';
import { PrismaClientRepository } from '../prisma/repositories/prisma-client.repository';
import { DatabaseModule } from './database.module';
import { ClientController } from '../http/controllers/client.controller';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateClientUseCase,
    { provide: CLIENT_REPOSITORY, useClass: PrismaClientRepository },
  ],
  controllers: [ClientController],
  exports: [CLIENT_REPOSITORY],
})
export class ClientModule {}
