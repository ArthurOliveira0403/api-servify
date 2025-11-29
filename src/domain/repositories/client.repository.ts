import { Client } from '../entities/client';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findByCpf(cpf: string): Promise<Client | null>;
}
