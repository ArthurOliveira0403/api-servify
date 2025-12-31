import { Body, Controller, Post } from '@nestjs/common';
import type { SignInAdminDTO } from 'src/application/dtos/sign-in-admin.dto';
import { SignInAdminUseCase } from 'src/application/use-cases/sign-in-admin.use-case';

@Controller('admin')
export class AdminAuthController {
  constructor(private signInAdminUseCase: SignInAdminUseCase) {}

  @Post('auth')
  async signUp(@Body() data: SignInAdminDTO) {
    const response = await this.signInAdminUseCase.handle(data);
    return response;
  }
}
