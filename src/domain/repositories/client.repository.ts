import { Client } from '../entities/client';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findBydId(id: string): Promise<Client | null>;
  findByInternationalId(internationalId: string): Promise<Client | null>;
}
