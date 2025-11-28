export class PriceConverter {
  static toResponse(price: number) {
    return price / 100;
  }

  static toRepository(price: number) {
    return price * 100;
  }
}
