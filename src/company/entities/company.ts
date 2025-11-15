import { randomUUID } from 'node:crypto';

interface CompanyProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  cnpj: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Company {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _cnpj: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props: CompanyProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._cnpj = props.cnpj;
    this._created_at = props.created_at ?? new Date();
    this._updated_at = props.updated_at ?? new Date();
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get cnpj() {
    return this._cnpj;
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }
}
