/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientUseCase } from 'src/application/use-cases/create-client.use-case';
import { ClientController } from 'src/infra/http/controllers/client.controller';

const createClientUseCaseMock = {
  provide: CreateClientUseCase,
  useValue: {
    handle: jest.fn().mockResolvedValue(undefined),
  },
};

describe('ClientController', () => {
  let clientController: ClientController;
  let createClientUseCase: CreateClientUseCase;
  let spies: any;

  const data = {
    fullName: 'John Doe',
    internationalId: '123456789',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [createClientUseCaseMock],
    }).compile();

    clientController = moduleRef.get<ClientController>(ClientController);
    createClientUseCase =
      moduleRef.get<CreateClientUseCase>(CreateClientUseCase);

    spies = {
      createClientUseCase: {
        handle: jest.spyOn(createClientUseCase, 'handle'),
      },
    };
  });

  it('should create a client', async () => {
    const response = await clientController.create(data);

    expect(spies.createClientUseCase.handle).toHaveBeenCalledWith(data);
    expect(response.message).toBe('Client successfully created');
  });

  it('should throw a ConflictException when client already exists', async () => {
    spies.createClientUseCase.handle.mockRejectedValue(new ConflictException());

    await expect(clientController.create(data)).rejects.toThrow(
      ConflictException,
    );

    expect(spies.createClientUseCase.handle).toHaveBeenCalledWith(data);
  });
});
