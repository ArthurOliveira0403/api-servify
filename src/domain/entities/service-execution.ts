import { randomUUID } from 'crypto';

export type ServiceExecutionStatus = 'PENDING' | 'DONE' | 'CANCELED';

interface ServiceExecutionProps {
  id?: string;
  companyId: string;
  serviceId: string;
  clientCompanyId: string;
  executedAt: Date;
  price: number; // cents
  status?: ServiceExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateDetailsProps {
  serviceId?: string;
  clientCompanyId?: string;
  executedAt?: Date;
  price?: number;
  status?: ServiceExecutionStatus;
}

export class ServiceExecution {
  private readonly _id: string;
  private _companyId: string;
  private _serviceId: string;
  private _clientCompanyId: string;
  private _executedAt: Date;
  private _price: number; // cents
  private _status: ServiceExecutionStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ServiceExecutionProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._serviceId = props.serviceId;
    this._clientCompanyId = props.clientCompanyId;
    this._executedAt = props.executedAt;
    this._price = props.price;
    this._status = props.status ?? 'PENDING';
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  updateDetails(props: UpdateDetailsProps) {
    this._executedAt = props.executedAt ?? this.executedAt;
    this._price = props.price ?? this.price;
    this._status = props.status ?? this.status;
  }

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get serviceId() {
    return this._serviceId;
  }
  get clientCompanyId() {
    return this._clientCompanyId;
  }
  get executedAt() {
    return this._executedAt;
  }
  get price() {
    return this._price;
  }
  get status() {
    return this._status;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
