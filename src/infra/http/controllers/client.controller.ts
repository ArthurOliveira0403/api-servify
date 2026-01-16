import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  createClientBodySchema,
  type CreateClientBodyDTO,
} from 'src/infra/schemas/create-client.schemas';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.use-case';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { Zod } from 'src/infra/decorators/zod-decorator';

@Controller('client')
export class ClientController {
  constructor(private createClientUseCase: CreateClientUseCase) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(@Body(Zod(createClientBodySchema)) data: CreateClientBodyDTO) {
    await this.createClientUseCase.handle(data);
    return {
      message: 'Client successfully created',
    };
  }
}
