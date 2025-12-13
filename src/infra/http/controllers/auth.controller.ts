import { Body, Controller, Post } from '@nestjs/common';
import type { SignInDTO } from '../../../application/dtos/sign-up.dto';
import { SignInUseCase } from '../../../application/use-cases/sign-up.use-case';
import type { SignUpDTO } from '../../../application/dtos/sign-in.dto';
import { SignUpUseCase } from '../../../application/use-cases/sign-in.use-case';

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
