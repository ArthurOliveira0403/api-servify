import { randomUUID } from 'node:crypto';

export type PlanType = 'MONTHLY' | 'YEARLY';

interface PlanProps {
  id?: string;
  name: string;
  type: PlanType;
  price: number;
  description: string;
}

export class Plan {
  private readonly _id: string;
  private _name: string;
  private _type: PlanType;
  private _price: number;
  private _description: string;

  constructor(props: PlanProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._type = props.type;
    this._price = props.price;
    this._description = props.description;
  }

  public update(props: Partial<PlanProps>) {
    this._name = props.name ?? this.name;
    this._type = props.type ?? this.type;
    this._price = props.price ?? this.price;
    this._description = props.description ?? this.description;
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
}
