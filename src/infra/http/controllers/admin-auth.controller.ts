import { Body, Controller, Post } from '@nestjs/common';
import type { SignUpAdminDTO } from 'src/application/dtos/sign-in-admin.dto';
import { SignUpAdminUseCase } from 'src/application/use-cases/sign-in-admin.use-case';

@Controller('admin')
export class AdminAuthController {
  constructor(private signUpAdminUseCase: SignUpAdminUseCase) {}

  @Post('auth')
  async signUp(@Body() data: SignUpAdminDTO) {
    const response = await this.signUpAdminUseCase.handle(data);
    return response;
  }
}
