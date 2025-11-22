import { Body, Controller, Post } from '@nestjs/common';
import type { SignUpAdminDTO } from 'src/application/dtos/sign-up-admin.dto';
import { SignUpAdminUseCase } from 'src/application/use-cases/sign-up-admin.use-case';

@Controller('admin')
export class AdminAuthController {
  constructor(private signUpAdminUseCase: SignUpAdminUseCase) {}

  @Post('auth')
  async signUp(@Body() data: SignUpAdminDTO) {
    const response = await this.signUpAdminUseCase.handle(data);
    return response;
  }
}
