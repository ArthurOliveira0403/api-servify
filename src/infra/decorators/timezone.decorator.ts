import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Timezone = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const timezone =
      (request.headers['X-Timezone'] as string) ||
      (request.headers['x-timezone'] as string) ||
      (request.headers['timezone'] as string) ||
      'America/Sao_Paulo';

    return timezone;
  },
);
