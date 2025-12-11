import { Module } from '@nestjs/common';
import { JWT_SERVICE } from 'src/application/services/jwt.service';
import { JwtService } from '../jwt/jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [{ provide: JWT_SERVICE, useClass: JwtService }],
  imports: [
    PassportModule,
    NestJwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JWT_SERVICE],
})
export class JwtModule {}
