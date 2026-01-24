import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReturnCompanyUser } from '../jwt/strategies/returns-jwt-strategy';

export const CurrentCompanyUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: ReturnCompanyUser }>();
    return request.user;
  },
);
