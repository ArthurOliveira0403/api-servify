import { randomUUID } from 'node:crypto';
import { SubscriptionException } from './exceptions/subscription-exception';

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED';

abstract class SubscriptionProps {
  id?: string;
  companyId: string;
  planId: string;
  price: number;
  status?: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  renewalDate?: Date;
  autoRenew?: boolean;
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
  private _autoRenew: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: SubscriptionProps) {
    if (props.endDate <= props.startDate)
      throw new SubscriptionException(
        'The startDate is smaller than the endDate',
        'Invalid subscription period',
        Subscription.name,
      );

    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._planId = props.planId;
    this._price = props.price;
    this._status = props.status ?? 'ACTIVE';
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._renewalDate = props.renewalDate ?? props.endDate;
    this._autoRenew = props.autoRenew ?? true;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  checkExpiration(now: Date) {
    if (now > this.endDate) this._status = 'EXPIRED';
  }

  renew(newEndDate: Date, now: Date) {
    if (!this._autoRenew)
      throw new SubscriptionException(
        'Subscription is not set to auto renew',
        'Auto renew subscription disable',
        Subscription.name,
      );

    if (newEndDate <= this.endDate)
      throw new SubscriptionException(
        'The new endDate is smaller than the old endDate',
        'Invalid subscription endDate',
        Subscription.name,
      );

    if (newEndDate <= now)
      throw new SubscriptionException(
        'The newEndDate is smaller than the nowDate',
        'Invalid new subscription period',
        Subscription.name,
      );

    this._status = 'ACTIVE';
    this._endDate = newEndDate;
    this._renewalDate = newEndDate;
    this._updatedAt = now;
  }

  cancelAtPeriodEnd(now: Date) {
    if (this.status !== 'ACTIVE')
      throw new SubscriptionException(
        'This Subscription status already is CANCELED',
        'Only active subscriptions can be canceled',
        Subscription.name,
      );

    this._autoRenew = false;
    this._updatedAt = now;
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
  get autoRenew() {
    return this._autoRenew;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
