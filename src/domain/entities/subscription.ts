import { randomUUID } from 'node:crypto';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'EXPIRED';

interface SubscriptionProps {
  id?: string;
  companyId: string;
  planId: string;
  price: number;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  renewalDate: Date;
}

export class Subscription {
  private _id: string;
  private _companyId: string;
  private _planId: string;
  private _price: number;
  private _status: SubscriptionStatus;
  private _startDate: Date;
  private _endDate: Date;
  private _renewalDate: Date;

  constructor(props: SubscriptionProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._planId = props.planId;
    this._price = props.price;
    this._status = props.status;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._renewalDate = props.renewalDate;
  }

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get planId() {
    return this._planId;
  }
  get price() {
    return this._price;
  }
  get status() {
    return this._status;
  }
  get startDate() {
    return this._startDate;
  }
  get endDate() {
    return this._endDate;
  }
  get renewalDate() {
    return this._renewalDate;
  }
}
