import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '../types/AuthRequest';
import { ADMIN_PERMISSION_KEY } from '../types/decorators/admin.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const needAdminPermission = this.reflector.getAllAndOverride<boolean>(ADMIN_PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!needAdminPermission) {
      return true;
    }

    const { principal } = context.switchToHttp().getRequest<AuthRequest>();
    return principal.isAdmin;
  }
}