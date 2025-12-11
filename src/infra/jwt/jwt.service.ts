import { Injectable } from '@nestjs/common';
import { JwtService as JwtProvider } from '@nestjs/jwt';
import { TokenPayload } from 'src/application/services/jwt.service';
import { JwtService as IJwtService } from 'src/application/services/jwt.service';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private jwtService: JwtProvider) {}

  sign(payload: TokenPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
