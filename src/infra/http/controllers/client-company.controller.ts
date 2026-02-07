import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateClientCompanyUseCase } from 'src/application/use-cases/create-client-company.use-case';
import { ListManyByCompanyClientsCompanyUseCase } from 'src/application/use-cases/list-many-by-company-clients-company';
import { UpdateClientCompanyUseCase } from 'src/application/use-cases/update-client-company.use-case';
import { ClientCompany } from 'src/domain/entities/client-company';
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { Zod } from 'src/infra/decorators/zod-decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';
import { ClientCompanyResponseMapper } from 'src/infra/http/mappers/client-company-response.mapper';
import {
  createClientCompanyBodySchema,
  type CreateClientCompanyBodyDTO,
} from 'src/infra/schemas/create-client-company.schemas';
import {
  type UpdateClientCompanyBodyDTO,
  type UpdateClientCompanyParamDTO,
  updateClientCompanyBodySchema,
  updateClientCompanyParamSchema,
} from 'src/infra/schemas/update-client-company.schemas';

@Controller('client-company')
export class ClientCompanyController {
  constructor(
    private createClientCompanyUseCase: CreateClientCompanyUseCase,
    private listManyByCompanyClientsCompaniesUseCase: ListManyByCompanyClientsCompanyUseCase,
    private updateClientCompanyUseCase: UpdateClientCompanyUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthCompanyGuard)
  async create(
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Body(Zod(createClientCompanyBodySchema)) data: CreateClientCompanyBodyDTO,
  ) {
    const { clientCompanyId } = await this.createClientCompanyUseCase.handle({
      ...data,
      companyId: user.id,
    });
    return {
      message: 'Client Company successfully created',
      clientCompanyId,
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async findAll(@CurrentCompanyUser() user: ReturnCompanyUser) {
    const clientsCompany =
      await this.listManyByCompanyClientsCompaniesUseCase.handle({
        companyId: user.id,
      });

    return clientsCompany
      ? clientsCompany.map((c: ClientCompany) =>
          ClientCompanyResponseMapper.handle(c),
        )
      : [];
  }

  @Patch(':id')
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Param('id', Zod(updateClientCompanyParamSchema))
    id: UpdateClientCompanyParamDTO,
    @Body(Zod(updateClientCompanyBodySchema)) data: UpdateClientCompanyBodyDTO,
  ) {
    await this.updateClientCompanyUseCase.handle({
      ...data,
      companyId: user.id,
      clientCompanyId: id,
    });
    return {
      message: 'Client Company successfully updated',
    };
  }
}
