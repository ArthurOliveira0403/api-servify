import { randomUUID } from 'node:crypto';

interface ClientCompanyProps {
  id?: string;
  companyId: string;
  clientId: string;
  createdAt?: Date;
}

export class ClientCompany {
  private readonly _id: string;
  private _companyId: string;
  private _clientId: string;
  private _createdAt: Date;

  constructor(props: ClientCompanyProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._clientId = props.clientId;
    this._createdAt = props.createdAt ?? new Date();
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
  get createdAt() {
    return this._createdAt;
  }
}
