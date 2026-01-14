import { randomUUID } from 'node:crypto';

interface ServiceProps {
  id?: string;
  companyId: string;
  name: string;
  description: string;
  basePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateServiceProps {
  name?: string;
  description?: string;
  basePrice?: number;
}

export class Service {
  private readonly _id: string;
  private readonly _companyId: string;
  private _name: string;
  private _description: string;
  private _basePrice: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ServiceProps) {
    this._id = props.id ?? randomUUID();
    this._companyId = props.companyId;
    this._name = props.name;
    this._description = props.description;
    this._basePrice = props.basePrice;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  public update(props: UpdateServiceProps) {
    this._description = props.description ?? this.description;
    this._basePrice = props.basePrice ?? this.basePrice;
    this._updatedAt = new Date();
  }

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get basePrice() {
    return this._basePrice;
  }
  get createdAt() {
    return this._createdAt;
  }
  get update_at() {
    return this._updatedAt;
  }
}
