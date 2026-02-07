import { DateTransformService } from 'src/application/services/date-transform.service';

export const dateTransformMock: DateTransformService = {
  addMonths: jest.fn().mockReturnValue(new Date()),
  addYears: jest.fn().mockReturnValue(new Date()),
  formatInTimezone: jest.fn().mockReturnValue(new Date().toISOString()),
  formatInTimezoneWithoutHour: jest
    .fn()
    .mockReturnValue(new Date().toISOString()),
  nowUTC: jest.fn().mockReturnValue(new Date()),
  toTimezone: jest.fn().mockReturnValue(new Date()),
  toUTC: jest.fn().mockReturnValue(new Date()),
};
