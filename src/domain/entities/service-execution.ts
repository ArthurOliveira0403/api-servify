import { randomUUID } from 'crypto';

export type ServiceExecutionStatus = 'PENDING' | 'DONE' | 'CANCELED';

interface ServiceExecutionProps {
  id?: string;
  companyId: string;
  serviceId: string;
  clientCompanyId: string;
  executedAt: Date;
  price: number;
  status?: ServiceExecutionStatus;
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
  private _price: number;
  private _status: ServiceExecutionStatus;

  constructor(props: ServiceExecutionProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._serviceId = props.serviceId;
    this._clientCompanyId = props.clientCompanyId;
    this._executedAt = props.executedAt;
    this._price = props.price;
    this._status = props.status ?? 'PENDING';
  }

  updateDetails(props: UpdateDetailsProps) {
    this._serviceId = props.serviceId ?? this.serviceId;
    this._clientCompanyId = props.clientCompanyId ?? this.clientCompanyId;
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
}
