import { DateTransformService } from 'src/application/services/date-transform.service';

export const dateTransformMock: DateTransformService = {
  addMonths: jest.fn(),
  addYears: jest.fn(),
  formatInTimezone: jest.fn(),
  nowUTC: jest.fn(),
  toTimezone: jest.fn(),
  toUTC: jest.fn(),
};
