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
import { ServiceReponseMapper } from 'src/infra/mappers/service-response.mapper';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
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
    @Body() data: { name: string; description: string; basePrice: number },
  ) {
    await this.createServiceUseCase.handle({ ...data, companyId: user.id });
    return {
      message: 'Service successfully created',
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async listAll(@CurrentUser() user: ReturnJwtStrategy) {
    const services = await this.listServicesUseCase.handle({
      companyId: user.id,
    });

    return ServiceReponseMapper.various(services);
  }

  @Patch(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @Param('id') serviceId: string,
    @Body() data: { name?: string; description: string; basePrice: number },
  ) {
    await this.updateServiceUseCase.handle({ ...data, serviceId });
    return {
      message: 'Successfully service updated',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async delete(@Param('id') id: string) {
    await this.deleteServiceUseCase.handle({ serviceId: id });
    return {
      message: 'Successfully service deleted',
    };
  }
}
