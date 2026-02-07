import { randomUUID } from 'node:crypto';
import { Address } from './address';
import { Subscription } from 'src/domain/entities/subscription';
import { UserRole } from '../common/user-role';

interface CompanyProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  cnpj: string;
  address?: Address;
  phoneNumber?: string;
  subscriptions?: Subscription[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompanyUpdateProps {
  name?: string;
  address?: Partial<Address>;
  phoneNumber?: string;
  updatedAt: Date;
}

export class Company {
  private readonly _role: UserRole;
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _cnpj: string;
  private _address: Address | null;
  private _phoneNumber: string | null;
  private _subscriptions: Subscription[] | [];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CompanyProps) {
    this._role = 'COMPANY';
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._cnpj = props.cnpj;
    this._address = props.address ?? null;
    this._phoneNumber = props.phoneNumber ?? null;
    this._subscriptions = props.subscriptions ?? [];
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  public update(data: CompanyUpdateProps) {
    if (data.name !== undefined) this._name = data.name;
    if (data.phoneNumber !== undefined) this._phoneNumber = data.phoneNumber;
    if (data.address) {
      if (this._address) {
        this._address.update(data.address);
      } else {
        this._address = new Address({ company_id: this._id, ...data.address });
      }
    }
    this._updatedAt = data.updatedAt;
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
  get phoneNumber() {
    return this._phoneNumber;
  }
  get subscriptions() {
    return this._subscriptions;
  }
  get role() {
    return this._role;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
