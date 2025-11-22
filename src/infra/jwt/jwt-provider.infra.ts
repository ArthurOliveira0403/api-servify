import { Injectable } from '@nestjs/common';
import {
  JwtService as Jwt,
  TokenPayload,
} from '../../application/services/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider implements Jwt {
  constructor(private jwtService: JwtService) {}

  sign(payload: TokenPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
