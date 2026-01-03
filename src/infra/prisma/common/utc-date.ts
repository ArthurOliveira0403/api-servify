export class UtcDate {
  static handle(date: Date): Date {
    return new Date(date.toISOString());
  }
}
