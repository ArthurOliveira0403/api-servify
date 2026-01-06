import { Address } from '../../domain/entities/address';

export class AddressResponseMapper {
  static handle(address: Address) {
    return {
      country: address.country,
      state: address.state,
      city: address.city,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      complement: address.complement,
    };
  }
}
