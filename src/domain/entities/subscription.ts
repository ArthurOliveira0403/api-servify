import { randomUUID } from 'node:crypto';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'EXPIRED';

interface SubscriptionProps {
  id?: string;
  company_id: string;
  plan_id: string;
  price: number;
  status: SubscriptionStatus;
  start_date: Date;
  end_date: Date;
  renewal_date: Date;
}

export class Subscription {
  private _id: string;
  private _company_id: string;
  private _plan_id: string;
  private _price: number;
  private _status: SubscriptionStatus;
  private _start_date: Date;
  private _end_date: Date;
  private _renewal_date: Date;

  constructor(props: SubscriptionProps) {
    this._id = props.id ?? randomUUID();
    this._company_id = props.company_id;
    this._plan_id = props.plan_id;
    this._price = props.price;
    this._status = props.status;
    this._start_date = props.start_date;
    this._end_date = props.end_date;
    this._renewal_date = props.renewal_date;
  }

  get id() {
    return this._id;
  }
  get company_id() {
    return this._company_id;
  }
  get plan_id() {
    return this._plan_id;
  }
  get price() {
    return this._price;
  }
  get status() {
    return this._status;
  }
  get start_date() {
    return this._start_date;
  }
  get end_date() {
    return this._end_date;
  }
  get renewal_date() {
    return this._renewal_date;
  }
}
