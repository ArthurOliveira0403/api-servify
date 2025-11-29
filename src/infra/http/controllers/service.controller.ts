import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { CreateServiceDTO } from 'src/application/dtos/create-service.dto';
import type { UpdateServiceDTO } from 'src/application/dtos/update-service.dto';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { Timezone } from 'src/infra/decorators/timezone.decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';

@Controller('service')
export class ServiceController {
  constructor(
    private updateServiceUseCase: UpdateServiceUseCase,
    private createServiceUseCase: CreateServiceUseCase,
  ) {}

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

  @Patch(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @Param('id') serviceId: string,
    @Body() data: UpdateServiceDTO,
    @Timezone() timezone: string,
  ) {
    const service = await this.updateServiceUseCase.handle(
      data,
      serviceId,
      timezone,
    );
    return {
      message: 'Successfully service updated',
      service,
    };
  }
}
