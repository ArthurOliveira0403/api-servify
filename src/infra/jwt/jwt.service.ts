/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { JwtService as JwtProvider } from '@nestjs/jwt';
import {
  TokenAdminPayload,
  TokenCompanyPayload,
} from 'src/application/services/jwt.service';
import { JwtService as IJwtService } from 'src/application/services/jwt.service';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private jwtService: JwtProvider) {}

  async signCompany(payload: TokenCompanyPayload): Promise<string> {
    const token: string = await this.jwtService.sign(payload);
    return token;
  }

  async signAdmin(payload: TokenAdminPayload): Promise<string> {
    const token = await this.jwtService.sign(payload);
    return token;
  }
}
