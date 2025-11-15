import { Body, Controller, Post } from '@nestjs/common';
import type { SignInDTO } from './dtos/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in.use-cases';
import type { SignUpDTO } from './dtos/sign-up.dto';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
  ) {}

  @Post('signin')
  async signIn(@Body() data: SignInDTO) {
    await this.signInUseCase.handle(data);
    return {
      message: 'The company successfully register',
    };
  }

  @Post('signup')
  async signUp(@Body() data: SignUpDTO) {
    const token = await this.signUpUseCase.handle(data);
    return token;
  }
}
