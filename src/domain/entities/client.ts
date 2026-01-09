import { randomUUID } from 'node:crypto';

interface ClientProps {
  id?: string;
  fullName: string;
  internationalId: string;
  createdAt?: Date;
}

export class Client {
  private readonly _id: string;
  private _fullName: string;
  private _internationalId: string;
  private _createdAt: Date;

  constructor(props: ClientProps) {
    this._id = props.id ?? randomUUID();
    this._fullName = props.fullName;
    this._internationalId = props.internationalId;
    this._createdAt = props.createdAt ?? new Date();
  }

  get id() {
    return this._id;
  }
  get fullName() {
    return this._fullName;
  }
  get internationalId() {
    return this._internationalId;
  }
  get createdAt() {
    return this._createdAt;
  }
}
