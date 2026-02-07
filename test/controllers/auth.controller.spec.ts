import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SignInUseCase } from 'src/application/use-cases/sign-in.use-case';
import { SignUpUseCase } from 'src/application/use-cases/sign-up.use-case';
import { AuthController } from 'src/infra/http/controllers/auth.controller';
import { SignUpBodyDTO } from 'src/infra/schemas/sign-up.schemas';

const signUpUseCaseMock = {
  provide: SignUpUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

const signInUseCaseMock = {
  provide: SignInUseCase,
  useValue: {
    handle: jest.fn(),
  },
};

describe('authController', () => {
  let authController: AuthController;
  let signUpUseCase: SignUpUseCase;
  let signInUseCase: SignInUseCase;

  const data: SignUpBodyDTO = {
    name: 'Luminnus',
    cnpj: '132456789',
    email: 'luminnus@email.com',
    password: '123456',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [signInUseCaseMock, signUpUseCaseMock],
      controllers: [AuthController],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    signUpUseCase = moduleRef.get<SignUpUseCase>(SignUpUseCase);
    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
  });

  // SingUpUseCase
  it('should register a company', async () => {
    const response = await authController.signUp(data);
    expect(response).toEqual({ message: 'The company successfully register' });
  });

  it('should not register a company for company already exist', async () => {
    jest
      .spyOn(signUpUseCase, 'handle')
      .mockRejectedValue(new UnauthorizedException());

    await expect(authController.signUp(data)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  //SignInUseCase
  it('should log in a company', async () => {
    jest.spyOn(signInUseCase, 'handle').mockResolvedValue('token');

    const response = await authController.signIn({
      email: data.email,
      password: data.password,
    });

    expect(response).toEqual({ accessToken: 'token' });
  });

  it('should not log in a company for invalid email', async () => {
    jest
      .spyOn(signInUseCase, 'handle')
      .mockRejectedValue(new NotFoundException());

    await expect(
      authController.signIn({
        email: 'lumin@email.com',
        password: data.password,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should not log in a company for invalid password', async () => {
    jest
      .spyOn(signInUseCase, 'handle')
      .mockRejectedValue(new UnauthorizedException());

    await expect(
      authController.signIn({
        email: data.email,
        password: '33333',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
