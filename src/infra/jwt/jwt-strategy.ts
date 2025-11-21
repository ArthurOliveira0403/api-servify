/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../../application/services/jwt.infra';
import { Injectable } from '@nestjs/common';
import { ReturnJwtStrategy } from './return.jwt-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'defaultSecret',
      ignoreExpiration: false,
    });
  }

  validate(payload: TokenPayload) {
    return { id: payload.sub, email: payload.email } as ReturnJwtStrategy;
  }
}
