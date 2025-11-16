import { Injectable } from '@nestjs/common';
import { Jwt, TokenPayload } from './jwt.infra';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider implements Jwt {
  constructor(private jwtSecurity: JwtService) {}

  sign(payload: TokenPayload): string {
    const token = this.jwtSecurity.sign(payload);
    return token;
  }

  verify(token: string): TokenPayload {
    const isMatch: unknown = this.jwtSecurity.verify(token);
    return isMatch as TokenPayload;
  }
}
