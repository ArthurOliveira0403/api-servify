import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { CreateServiceDTO } from 'src/application/dtos/create-service.dto';
import type { UpdateServiceDTO } from 'src/application/dtos/update-service.dto';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { Timezone } from 'src/infra/decorators/timezone.decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';

@Controller('service')
export class ServiceController {
  constructor(
    private createServiceUseCase: CreateServiceUseCase,
    private listServicesUseCase: ListServicesUseCase,
    private updateServiceUseCase: UpdateServiceUseCase,
    private deleteServiceUseCase: DeleteServiceUseCase,
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

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async listAll(
    @CurrentUser() user: ReturnJwtStrategy,
    @Timezone() tz: string,
  ) {
    const response = await this.listServicesUseCase.handle({
      companyId: user.id,
      timezone: tz,
    });

    return response;
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

  @Delete(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async delete(@Param('id') id: string) {
    await this.deleteServiceUseCase.handle(id);
    return {
      message: 'Successfully service deleted',
    };
  }
}
