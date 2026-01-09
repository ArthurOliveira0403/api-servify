import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { CreateClientDTO } from 'src/application/dtos/create-client.dto';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.use-case';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';

@Controller('client')
export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(@Body() data: CreateClientDTO) {
    await this.createClientUseCase.handle(data);
    return {
      message: 'Client successfully created',
    };
  }
}
