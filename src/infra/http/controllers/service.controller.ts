import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import type { CreateServiceDTO } from 'src/application/dtos/create-service.dto';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';

@Controller('service')
export class ServiceController {
  constructor(private createServiceUseCase: CreateServiceUseCase) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(
    @CurrentUser() user: ReturnJwtStrategy,
    @Body() data: CreateServiceDTO,
  ) {
    await this.createServiceUseCase.handle(data, user.id);
    return {
      message: 'Service successfully created',
    };
  }
}
