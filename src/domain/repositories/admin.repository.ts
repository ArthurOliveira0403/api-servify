import { Admin } from '../entities/admin';

export const ADMIN_REPOSITORY = 'ADMIN_REPOSITORY';

export interface AdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
}
