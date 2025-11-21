import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import type { UpdatedCompanyDTO } from '../../../application/dtos/update-company.dto';
import { JwtAuthGuard } from 'src/infra/jwt/guards/jwt.auth-guard';
import { CurrentUser } from 'src/infra/decorators/current-user.decorator';
import { UpdateCompanyUseCase } from '../../../application/use-cases/updated-company.use-case';
import type { ReturnJwtStrategy } from 'src/infra/jwt/return.jwt-strategy';

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
