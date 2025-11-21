import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../services/jwt.infra';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: TokenPayload }>();
    return request.user;
  },
);
