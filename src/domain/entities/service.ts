import { randomUUID } from 'node:crypto';

export type ServiceStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';

interface ServiceProps {
  id?: string;
  company_id: string;
  client_id: string;
  description: string;
  status?: ServiceStatus;
  price: number;
  start_at?: Date;
  finished_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Service {
  private readonly _id?: string;
  private _company_id: string;
  private _client_id: string;
  private _description: string;
  private _status: ServiceStatus;
  private _price: number;
  private _start_at: Date | null;
  private _finished_at: Date | null;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props: ServiceProps) {
    this._id = props.id ?? randomUUID();
    this._company_id = props.company_id;
    this._client_id = props.client_id;
    this._description = props.description;
    this._status = props.status ?? 'PENDING';
    this._price = props.price;
    this._start_at = props.start_at ?? null;
    this._finished_at = props.finished_at ?? null;
    this._created_at = props.created_at ?? new Date();
    this._updated_at = props.updated_at ?? new Date();
  }

  get id() {
    return this._id;
  }
  get company_id() {
    return this._company_id;
  }
  get client_id() {
    return this._client_id;
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
  get start_at() {
    return this._start_at;
  }
  get finished_at() {
    return this._finished_at;
  }
  get created_at() {
    return this._created_at;
  }
  get update_at() {
    return this._updated_at;
  }
}
