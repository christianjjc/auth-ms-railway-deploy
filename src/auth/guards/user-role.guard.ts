import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get('roles', context.getHandler());

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest(); // como se encuentra NEST en este momento con todos los datos
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found (request)');

    if (validRoles.includes(user.role.name)) {
      return true;
    }

    throw new ForbiddenException(`User '${user.firstName} ${user.lastName}' needs a valid Role: [${validRoles.join(', ')}]`);
  }
}
