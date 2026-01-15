import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  type ClientRepository,
} from 'src/domain/repositories/client.repository';
import { CreateClientDTO } from '../dtos/create-client.dto';
import { Client } from 'src/domain/entities/client';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: ClientRepository,
  ) {}

  async handle(data: CreateClientDTO): Promise<void> {
    const clientExists = await this.clientRepository.findByInternationalId(
      data.internationalId,
    );
    if (clientExists) throw new ConflictException('Client already exists');

    const client = new Client({
      ...data,
    });

    await this.clientRepository.save(client);
  }
}
