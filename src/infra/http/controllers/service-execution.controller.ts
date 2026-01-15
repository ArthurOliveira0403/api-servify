import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateServiceExecutionUseCase } from 'src/application/use-cases/create-service-execution.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';

@Controller('service-execution')
export class ServiceExecutionController {
  constructor(
    private createServiceExecutionUseCase: CreateServiceExecutionUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(
    @CurrentUser() user: ReturnJwtStrategy,
    @Body()
    data: {
      serviceId: string;
      clientCompanyId: string;
      executedAt: string;
    },
  ) {
    await this.createServiceExecutionUseCase.handle({
      ...data,
      companyId: user.id,
    });
    return {
      message: 'Service execution successfully created',
    };
  }
}
