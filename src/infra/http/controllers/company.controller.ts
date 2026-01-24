import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthCompanyGuard } from 'src/infra/jwt/guards/jwt-auth-company.guard';
import { CurrentCompanyUser } from 'src/infra/decorators/current-company-user.decorator';
import { UpdateCompanyUseCase } from 'src/application/use-cases/update-company.use-case';
import {
  type UpdateCompanyBodyDTO,
  updateCompanyBodySchema,
} from 'src/infra/schemas/update-company.schemas';
import { Zod } from 'src/infra/decorators/zod-decorator';
import { ReturnCompanyUser } from 'src/infra/jwt/strategies/returns-jwt-strategy';

@Controller('company')
export class CompanyController {
  constructor(private updatedUseCase: UpdateCompanyUseCase) {}

  @Patch()
  @UseGuards(JwtAuthCompanyGuard)
  async update(
    @CurrentCompanyUser() user: ReturnCompanyUser,
    @Body(Zod(updateCompanyBodySchema)) data: UpdateCompanyBodyDTO,
  ) {
    await this.updatedUseCase.handle(user.id, data);
    return {
      message: 'Company successfully updated',
    };
  }
}
