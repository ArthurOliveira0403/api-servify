import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import type { UpdatedCompanyDTO } from './dtos/update-company.dto';
import { JwtAuthGuard } from 'src/auth/infra/jwt/guards/jwt.auth-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateCompanyUseCase } from './use-cases/updated-company.use-case';
import type { ReturnJwtStrategy } from 'src/auth/infra/jwt/strategies/return.jwt-strategy';

@Controller('company')
export class CompanyController {
  constructor(private updatedUseCase: UpdateCompanyUseCase) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() user: ReturnJwtStrategy,
    @Body() data: UpdatedCompanyDTO,
  ) {
    const response = await this.updatedUseCase.handle(user.id, data);
    return {
      message: 'Company successfully updated',
      company: response,
    };
  }
}
