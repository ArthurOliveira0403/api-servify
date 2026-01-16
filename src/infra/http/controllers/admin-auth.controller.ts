import { Body, Controller, Post } from '@nestjs/common';
import { SignInAdminUseCase } from 'src/application/use-cases/sign-in-admin.use-case';
import { Zod } from 'src/infra/decorators/zod-decorator';
import {
  type SignInAdminBodyDTO,
  signInAdminBodySchema,
} from 'src/infra/schemas/sign-in-admin.schemas';

@Controller('admin')
export class AdminAuthController {
  constructor(private signInAdminUseCase: SignInAdminUseCase) {}

  @Post('auth')
  async signUp(@Body(Zod(signInAdminBodySchema)) data: SignInAdminBodyDTO) {
    const response = await this.signInAdminUseCase.handle(data);
    return response;
  }
}
