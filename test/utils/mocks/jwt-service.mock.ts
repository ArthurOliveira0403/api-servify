import { JwtService } from 'src/application/services/jwt.service';

export const JwtServiceMock: JwtService = {
  signCompany: jest.fn().mockResolvedValue('fake-token'),
  signAdmin: jest.fn().mockResolvedValue('fake-token'),
};
