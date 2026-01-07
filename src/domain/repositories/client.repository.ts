import { Client } from '../entities/client';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findByInternationalId(internationalId: string): Promise<Client | null>;
}
