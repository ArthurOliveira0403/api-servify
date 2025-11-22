import { UserRole } from 'src/domain/common/user-role';

export interface ReturnJwtStrategy {
  id: string;
  email: string;
  role: UserRole;
}
