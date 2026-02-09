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
import { ServiceReponseMapper } from 'src/infra/http/mappers/service-response.mapper';
import { CreateServiceUseCase } from 'src/application/use-cases/create-service.use-case';
import { DeleteServiceUseCase } from 'src/application/use-cases/delete-service.use-case';
import { ListServicesUseCase } from 'src/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from 'src/application/use-cases/update-service.use-case';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
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
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';

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
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Body(Zod(createServiceBodySchema)) data: CreateServiceBodyDTO,
  ) {
    const { serviceId } = await this.createServiceUseCase.handle({
      ...data,
      companyId: user.id,
    });
    return {
      message: 'Service successfully created',
      serviceId,
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async listAll(@CurrentCompanyUser() user: ReturnCompanyUser) {
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
    const { service } = await this.updateServiceUseCase.handle({
      ...data,
      serviceId,
    });
    return {
      message: 'Successfully service updated',
      service: ServiceReponseMapper.unique(service),
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
