import { Address } from '../../domain/entities/address';

export class toAddressMapper {
  static handle(address: Address) {
    return {
      country: address.country,
      state: address.state,
      city: address.city,
      street: address.street,
      number: address.number,
      zip_code: address.zip_code,
      complement: address.complement,
    };
  }
}
