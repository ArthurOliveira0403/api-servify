export const DATE_TRANSFORM_SERVICE = 'DATE_TRANSFORM_SERVICE';

export interface DateTransformService {
  nowUTC(): Date;
  toTimezone(date: Date, tz: string): Date;
  toUTC(date: Date): Date;
  formatInTimezone(date: Date | string, tz: string): string;
  formatInTimezoneWithoutHour(date: Date, tz: string): string;
  addMonths(date: Date | string, months: number): Date;
  addYears(date: Date | string, years: number): Date;
}
