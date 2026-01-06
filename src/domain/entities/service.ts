import { randomUUID } from 'node:crypto';

export type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';

interface ServiceProps {
  id?: string;
  companyId: string;
  clientId: string;
  description: string;
  status?: ServiceStatus;
  price: number;
  startAt?: Date;
  finishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateServiceProps {
  description?: string;
  status?: ServiceStatus;
  price?: number;
  startAt?: Date;
  finishedAt?: Date;
}

export class Service {
  private readonly _id?: string;
  private _companyId: string;
  private _clientId: string;
  private _description: string;
  private _status: ServiceStatus;
  private _price: number;
  private _startAt: Date | null;
  private _finishedAt: Date | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ServiceProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._clientId = props.clientId;
    this._description = props.description;
    this._status = props.status ?? 'PENDING';
    this._price = props.price;
    this._startAt = props.startAt ?? null;
    this._finishedAt = props.finishedAt ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  public update(props: UpdateServiceProps) {
    this._description = props.description ?? this.description;
    this._price = props.price ?? this.price;
    this._status = props.status ?? this.status;
    this._startAt = props.startAt ?? this.startAt;
    this._finishedAt = props.finishedAt ?? this.finishedAt;
    this._updatedAt = new Date();
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
  get description() {
    return this._description;
  }
  get status() {
    return this._status;
  }
  get price() {
    return this._price;
  }
  get startAt() {
    return this._startAt;
  }
  get finishedAt() {
    return this._finishedAt;
  }
  get createdAt() {
    return this._createdAt;
  }
  get update_at() {
    return this._updatedAt;
  }
}
