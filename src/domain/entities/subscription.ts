import { randomUUID } from 'node:crypto';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'EXPIRED';

abstract class SubscriptionProps {
  id?: string;
  companyId: string;
  planId: string;
  price: number;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  renewalDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SubscriptionProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._planId = props.planId;
    this._price = props.price;
    this._status = props.status;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._renewalDate = props.renewalDate;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
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
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
