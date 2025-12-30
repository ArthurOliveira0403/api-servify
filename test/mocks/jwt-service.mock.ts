import { JwtService } from 'src/application/services/jwt.service';

export const JwtServiceMock: JwtService = {
  sign: jest.fn().mockResolvedValue('fake-token'),
};
