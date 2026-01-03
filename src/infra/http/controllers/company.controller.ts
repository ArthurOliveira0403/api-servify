import { Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import type { UpdateCompanyDTO } from 'src/application/dtos/update-company.dto';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import { Timezone } from 'src/infra/decorators/timezone.decorator';
import {
  DATE_TRANSFORM,
  type DateTransformService,
} from 'src/application/services/date-transform.service';
import { CompanyResponseMapper } from 'src/infra/mappers/company-response.mapper';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(DATE_TRANSFORM)
    private dateTransform: DateTransformService,
    private updatedUseCase: UpdateCompanyUseCase,
  ) {}

  @Patch()
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @Timezone() tz: string,
    @CurrentUser() user: ReturnJwtStrategy,
    @Body() data: UpdateCompanyDTO,
  ) {
    const company = await this.updatedUseCase.handle(user.id, data);
    return {
      message: 'Company successfully updated',
      company: CompanyResponseMapper.handle(company, tz, this.dateTransform),
    };
  }
}
