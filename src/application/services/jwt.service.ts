import { UserRole } from 'src/domain/common/user-role';

export const JWT_SERVICE = 'JWT_SERVICE';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface JwtService {
  sign(payload: TokenPayload): Promise<string>;
}
