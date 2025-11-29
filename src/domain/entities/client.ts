import { randomUUID } from 'node:crypto';

interface ClientProps {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Client {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _cpf: string;
  private _phone_number: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props: ClientProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._cpf = props.cpf;
    this._phone_number = props.phone_number;
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
  get cpf() {
    return this._cpf;
  }
  get phone_number() {
    return this._phone_number;
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }
}
