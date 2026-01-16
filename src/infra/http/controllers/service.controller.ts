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
import {
  type CreateServiceBodyDTO,
  createServiceBodySchema,
} from 'src/infra/schemas/create-service.schemas';
import { Zod } from 'src/infra/decorators/zod-decorator';
import {
  type UpdateServiceBodyDTO,
  type UpdateServiceParamDTO,
  updateServiceParamSchema,
  updateServiceBodySchema,
} from 'src/infra/schemas/update-service.schemas';
import {
  type DeleteServiceParamDTO,
  deleteServiceParamSchema,
} from 'src/infra/schemas/delete-service.schemas';

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
    @Body(Zod(createServiceBodySchema)) data: CreateServiceBodyDTO,
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
    @Param('id', Zod(updateServiceParamSchema))
    serviceId: UpdateServiceParamDTO,
    @Body(Zod(updateServiceBodySchema)) data: UpdateServiceBodyDTO,
  ) {
    await this.updateServiceUseCase.handle({ ...data, serviceId });
    return {
      message: 'Successfully service updated',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async delete(
    @Param('id', Zod(deleteServiceParamSchema)) id: DeleteServiceParamDTO,
  ) {
    await this.deleteServiceUseCase.handle({ serviceId: id });
    return {
      message: 'Successfully service deleted',
    };
  }
}
