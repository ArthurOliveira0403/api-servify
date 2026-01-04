/* eslint-disable @typescript-eslint/await-thenable */
import { Client } from 'src/domain/entities/client';
import { ClientRepository } from 'src/domain/repositories/client.repository';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async save(client: Client): Promise<void> {
    await this.clients.push(client);
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = await this.clients.find((c) => c.cpf === cpf);
    return client ?? null;
  }
}
