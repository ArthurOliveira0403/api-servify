import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateServiceExecutionUseCase } from 'src/application/use-cases/create-service-execution.use-case';
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { Zod } from 'src/infra/decorators/zod-decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';
import {
  type CreateServiceExecutionBodyDTO,
  createServiceExecutionBodySchema,
} from 'src/infra/schemas/create-service-execution.schemas';

@Controller('service-execution')
export class ServiceExecutionController {
  constructor(
    private createServiceExecutionUseCase: CreateServiceExecutionUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Body(Zod(createServiceExecutionBodySchema))
    data: CreateServiceExecutionBodyDTO,
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
