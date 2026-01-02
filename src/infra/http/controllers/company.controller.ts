import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import type { UpdateCompanyDTO } from 'src/application/dtos/update-company.dto';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import { Timezone } from 'src/infra/decorators/timezone.decorator';

@Controller('company')
export class CompanyController {
  constructor(private updatedUseCase: UpdateCompanyUseCase) {}

  @Patch()
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @Timezone() tz: string,
    @CurrentUser() user: ReturnJwtStrategy,
    @Body() data: UpdateCompanyDTO,
  ) {
    const response = await this.updatedUseCase.handle(user.id, data, tz);
    return {
      message: 'Company successfully updated',
      company: response,
    };
  }
}
