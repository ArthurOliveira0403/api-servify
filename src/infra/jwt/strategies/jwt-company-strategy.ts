import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenCompanyPayload } from '../../../application/services/jwt.service';
import { Injectable } from '@nestjs/common';
import { ReturnCompanyUser } from './returns-jwt-strategy';

@Injectable()
export class JwtCompanyStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'defaultSecret',
      ignoreExpiration: false,
    });
  }

  validate(payload: TokenCompanyPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      cnpj: payload.cnpj,
      role: payload.role,
    } as ReturnCompanyUser;
  }
}
