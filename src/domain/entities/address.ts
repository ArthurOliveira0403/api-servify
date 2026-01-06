interface AddressProps {
  company_id: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  complement?: string | null;
}

interface UpdateAddressProps {
  country?: string | null;
  state?: string | null;
  city?: string | null;
  street?: string | null;
  number?: string | null;
  zipCode?: string | null;
  complement?: string | null;
}

export class Address {
  private _company_id: string;
  private _country: string | null;
  private _state: string | null;
  private _city: string | null;
  private _street: string | null;
  private _number: string | null;
  private _zipCode: string | null;
  private _complement: string | null;

  constructor(props: AddressProps) {
    this._company_id = props.company_id;
    this._country = props.country ?? null;
    this._state = props.state ?? null;
    this._city = props.city ?? null;
    this._street = props.street ?? null;
    this._number = props.number ?? null;
    this._zipCode = props.zipCode ?? null;
    this._complement = props.complement ?? null;
  }

  public update(props: UpdateAddressProps) {
    this._country = props.country ?? this.country;
    this._state = props.state ?? this.state;
    this._city = props.city ?? this.city;
    this._street = props.street ?? this.street;
    this._number = props.number ?? this.number;
    this._zipCode = props.zipCode ?? this.zipCode;
    this._complement = props.complement ?? this.complement;
  }

  get company_id() {
    return this._company_id;
  }
  get country() {
    return this._country;
  }
  get state() {
    return this._state;
  }
  get city() {
    return this._city;
  }
  get street() {
    return this._street;
  }
  get number() {
    return this._number;
  }
  get zipCode() {
    return this._zipCode;
  }
  get complement() {
    return this._complement;
  }
}
