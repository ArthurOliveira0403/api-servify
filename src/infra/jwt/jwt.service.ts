/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { JwtService as JwtProvider } from '@nestjs/jwt';
import { TokenPayload } from 'src/application/services/jwt.service';
import { JwtService as IJwtService } from 'src/application/services/jwt.service';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private jwtService: JwtProvider) {}

  async sign(payload: TokenPayload): Promise<string> {
    const token: string = await this.jwtService.sign(payload);
    return token;
  }
}
