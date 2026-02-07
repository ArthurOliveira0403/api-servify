import { randomUUID } from 'node:crypto';

export type PlanType = 'MONTHLY' | 'YEARLY';

abstract class PlanProps {
  id?: string;
  name: string;
  type: PlanType;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

abstract class UpdateProps {
  name?: string;
  type?: PlanType;
  price?: number;
  description?: string;
  updatedAt: Date;
}

export class Plan {
  private readonly _id: string;
  private _name: string;
  private _type: PlanType;
  private _price: number;
  private _description: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: PlanProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._type = props.type;
    this._price = props.price;
    this._description = props.description;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  public update(props: UpdateProps) {
    this._name = props.name ?? this.name;
    this._type = props.type ?? this.type;
    this._price = props.price ?? this.price;
    this._description = props.description ?? this.description;
    this._updatedAt = props.updatedAt;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get type() {
    return this._type;
  }
  get price() {
    return this._price;
  }
  get description() {
    return this._description;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
