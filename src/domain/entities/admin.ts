import { UserRole } from '../common/user-role';

interface AdminProps {
  id: string;
  email: string;
  password: string;
}

export class Admin {
  private readonly _id: string;
  private _email: string;
  private _password: string;
  private readonly _role: UserRole;

  constructor(props: AdminProps) {
    this._id = props.id;
    this._email = props.email;
    this._password = props.password;
    this._role = 'ADMIN';
  }

  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }

  get role() {
    return this._role;
  }
}
