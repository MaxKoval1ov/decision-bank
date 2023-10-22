import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Bearer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request?.get('authorization')?.replace('Bearer', '').trim();
  },
);
