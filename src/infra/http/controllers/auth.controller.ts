import { Body, Controller, Post } from '@nestjs/common';
import type { SignInDTO } from '../../../application/dtos/sign-in.dto';
import { SignUpUseCase } from '../../../application/use-cases/sign-up.use-case';
import type { SignUpDTO } from '../../../application/dtos/sign-up.dto';
import { SignInUseCase } from '../../../application/use-cases/sign-in.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
  ) {}

  @Post('signup')
  async signUp(@Body() data: SignUpDTO) {
    await this.signUpUseCase.handle(data);
    return {
      message: 'The company successfully register',
    };
  }

  @Post('signin')
  async signIn(@Body() data: SignInDTO) {
    const token = await this.signInUseCase.handle(data);
    return token;
  }
}
