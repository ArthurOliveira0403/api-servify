import { UserRole } from 'src/domain/common/user-role';

export const JWT_SERVICE = 'JWT_SERVICE';

export abstract class TokenCompanyPayload {
  sub: string;
  email: string;
  cnpj: string;
  role: UserRole;
}

export abstract class TokenAdminPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface JwtService {
  signCompany(payload: TokenCompanyPayload): Promise<string>;
  signAdmin(payload: TokenAdminPayload): Promise<string>;
}
