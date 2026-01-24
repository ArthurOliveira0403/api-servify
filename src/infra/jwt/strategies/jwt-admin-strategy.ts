import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenAdminPayload } from 'src/application/services/jwt.service';
import { ReturnAdminUser } from './returns-jwt-strategy';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 'defaultSecret',
      ignoreExpiration: false,
    });
  }

  validate(payload: TokenAdminPayload) {
    if (payload.role !== 'ADMIN')
      throw new UnauthorizedException('Not authorized as admin');
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    } as ReturnAdminUser;
  }
}
