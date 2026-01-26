/* eslint-disable @typescript-eslint/await-thenable */
import { Client } from 'src/domain/entities/client';
import { ClientRepository } from 'src/domain/repositories/client.repository';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];

  async save(client: Client): Promise<void> {
    await this.clients.push(client);
  }

  async findBydId(id: string): Promise<Client | null> {
    const client = await this.clients.find((c) => c.id === id);
    return client ?? null;
  }

  async findByInternationalId(internationalId: string): Promise<Client | null> {
    const client = await this.clients.find(
      (c) => c.internationalId === internationalId,
    );
    return client ?? null;
  }
}
