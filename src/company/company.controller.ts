import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import type { UpdatedCompanyDTO } from './dtos/update-company.dto';
import { JwtAuthGuard } from 'src/auth/infra/jwt/guard/jwt.auth-guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { TokenPayload } from 'src/auth/infra/jwt/jwt.infra';

@Controller('company')
export class CompanyController {
  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@CurrentUser() user: TokenPayload, @Body() data: UpdatedCompanyDTO) {
    console.log(data, user);
  }
}
