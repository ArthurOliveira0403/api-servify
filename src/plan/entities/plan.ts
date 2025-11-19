import { randomUUID } from 'node:crypto';

export enum PlanType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

interface PlanProps {
  id?: string;
  name: string;
  type: PlanType;
  price: number;
  description: string;
  features: string[];
}

export class Plan {
  private _id: string;
  private _name: string;
  private _type: PlanType;
  private _price: number;
  private _description: string;
  private _features: string[];

  constructor(props: PlanProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._type = props.type;
    this._price = props.price;
    this._description = props.description;
    this._features = props.features;
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
  get features() {
    return this._features;
  }
}
