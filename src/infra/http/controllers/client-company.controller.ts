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
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import { ClientCompanyResponseMapper } from 'src/infra/mappers/client-company-response.mapper';

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
    @CurrentUser() user: ReturnJwtStrategy,
    @Body()
    data: { clientInternationalId: string; email?: string; phone?: string },
  ) {
    await this.createClientCompanyUseCase.handle({
      ...data,
      companyId: user.id,
    });
    return {
      message: 'Client Company successfully created',
    };
  }

  @Get()
  @UseGuards(JwtAuthCompanyGuard)
  async findAll(@CurrentUser() user: ReturnJwtStrategy) {
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
    @CurrentUser() user: ReturnJwtStrategy,
    @Param('id') id: string,
    @Body() data: { email?: string; phone?: string },
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
