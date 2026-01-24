import { UserRole } from 'src/domain/common/user-role';

export abstract class ReturnCompanyUser {
  id: string;
  email: string;
  cnpj: string;
  role: UserRole;
}

export abstract class ReturnAdminUser {
  id: string;
  email: string;
  role: UserRole;
}
