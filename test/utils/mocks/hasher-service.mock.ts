/* eslint-disable @typescript-eslint/require-await */
import { HasherService } from 'src/application/services/password-hasher.service';

export const HasherServiceMock: HasherService = {
  hash: jest.fn(async (password: string) => {
    return `${password}_hash`;
  }),
  compare: jest.fn(async (password: string, hash: string) => {
    return hash === `${password}_hash` ? true : false;
  }),
};
