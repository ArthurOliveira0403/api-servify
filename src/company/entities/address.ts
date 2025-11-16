interface AddressProps {
  company_id: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  zip_code?: string;
  complement?: string;
}

export class Address {
  private _company_id: string;
  private _country: string | null;
  private _state: string | null;
  private _city: string | null;
  private _street: string | null;
  private _number: string | null;
  private _zip_code: string | null;
  private _complement: string | null;

  constructor(props: AddressProps) {
    this._company_id = props.company_id;
    this._country = props.country ?? null;
    this._state = props.state ?? null;
    this._city = props.city ?? null;
    this._street = props.street ?? null;
    this._number = props.number ?? null;
    this._zip_code = props.zip_code ?? null;
    this._complement = props.complement ?? null;
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
  get zip_Code() {
    return this._zip_code;
  }
  get complement() {
    return this._complement;
  }
}
