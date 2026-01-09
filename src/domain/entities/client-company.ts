import { randomUUID } from 'node:crypto';

interface ClientCompanyProps {
  id?: string;
  companyId: string;
  clientId: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateDetailsProps {
  email?: string;
  phone?: string;
}

export class ClientCompany {
  private readonly _id: string;
  private _companyId: string;
  private _clientId: string;
  private _email: string | null;
  private _phone: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ClientCompanyProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._clientId = props.clientId;
    this._email = props.email ?? null;
    this._phone = props.phone ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  updateDetails(props: UpdateDetailsProps) {
    this._email = props.email ?? this.email;
    this._phone = props.phone ?? this.phone;
  }

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get clientId() {
    return this._clientId;
  }
  get email() {
    return this._email;
  }
  get phone() {
    return this._phone;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
