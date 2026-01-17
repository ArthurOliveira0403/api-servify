import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import type { ReturnJwtStrategy } from 'src/infra/jwt/strategies/return-jwt-strategy';
import {
  type UpdateCompanyBodyDTO,
  updateCompanyBodySchema,
} from 'src/infra/schemas/update-company.schemas';
import { Zod } from 'src/infra/decorators/zod-decorator';

@Controller('company')
export class CompanyController {
  constructor(private updatedUseCase: UpdateCompanyUseCase) {}

  @Patch()
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @CurrentUser() user: ReturnJwtStrategy,
    @Body(Zod(updateCompanyBodySchema)) data: UpdateCompanyBodyDTO,
  ) {
    await this.updatedUseCase.handle(user.id, data);
    return {
      message: 'Company successfully updated',
    };
  }
}
