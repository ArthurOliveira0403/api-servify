import { randomUUID } from 'node:crypto';
import { Address } from './address';
import { Subscription } from 'src/domain/entities/subscription';
import { UserRole } from '@prisma/client';

interface CompanyProps {
  id?: string;
  name?: string;
  email: string;
  password: string;
  cnpj?: string;
  address?: Address;
  phone_number?: string;
  logo_url?: string;
  subscriptions?: Subscription[];
  created_at?: Date;
  updated_at?: Date;
}

interface CompanyUpdateProps {
  name?: string;
  cnpj?: string;
  address?: Partial<Address>;
  phone_number?: string;
}

export class Company {
  private readonly _id: string;
  private _name: string | null;
  private _email: string;
  private _password: string;
  private _cnpj: string | null;
  private _address: Address | null;
  private _phone_number: string | null;
  private _logo_url: string | null;
  private _subscriptions: Subscription[] | [];
  private readonly _role: UserRole;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props: CompanyProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name ?? null;
    this._email = props.email;
    this._password = props.password;
    this._cnpj = props.cnpj ?? null;
    this._address = props.address ?? null;
    this._phone_number = props.phone_number ?? null;
    this._logo_url = props.logo_url ?? null;
    this._subscriptions = props.subscriptions ?? [];
    this._role = 'COMPANY';
    this._created_at = props.created_at ?? new Date();
    this._updated_at = props.updated_at ?? new Date();
  }

  public update(data: CompanyUpdateProps) {
    if (data.name !== undefined) this._name = data.name;
    if (data.cnpj !== undefined) this._cnpj = data.cnpj;
    if (data.phone_number !== undefined) this._phone_number = data.phone_number;
    if (data.address) {
      if (this._address) {
        this._address.update(data.address);
      } else {
        this._address = new Address({ company_id: this._id, ...data.address });
      }
    }
    this._updated_at = new Date();
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
  get address() {
    return this._address;
  }
  get phone_number() {
    return this._phone_number;
  }
  get logo_url() {
    return this._logo_url;
  }
  get subscriptions() {
    return this._subscriptions;
  }
  get role() {
    return this._role;
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }
}
