import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetRole = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const role = req.role;

  if (!role) throw new InternalServerErrorException('Role not found (in request)');

  return !data ? role : role[data];
});
