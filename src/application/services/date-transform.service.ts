export const DATE_TRANSFORM = 'DATE_TRANSFORM';

export interface DateTransformService {
  nowUTC(): Date;
  toTimezone(date: Date, tz: string): Date;
  toUTC(date: Date): Date;
  formatInTimezone(date: Date | string, tz: string): string;
  addMonths(date: Date | string, months: number): Date;
  addYears(date: Date | string, years: number): Date;
}
