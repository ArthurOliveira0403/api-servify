import { randomUUID } from 'node:crypto';

interface ClientProps {
  id?: string;
  name: string;
  email: string;
  internationalId: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _internationalId: string;
  private _phoneNumber: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ClientProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._internationalId = props.internationalId;
    this._phoneNumber = props.phoneNumber;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get internationalId() {
    return this._internationalId;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
