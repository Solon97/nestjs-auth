import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { of } from 'rxjs';
import { map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { AuthRequest } from '../types/AuthRequest';
import { UserFromJwt } from '../types/UserFromJwt';
import { IS_PUBLIC_KEY } from '../types/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Se a rota for pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => context.switchToHttp().getRequest<AuthRequest>()),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => {
            if (!req.user) {
              throw Error('User was not found in request.');
            }

            return req.user;
          }),
          mergeMap((userFromJwt: UserFromJwt) =>
            this.userService.findById(userFromJwt.id),
          ),
          tap((user) => {
            request.principal = user;
          }),
        ),
      ),
      map((user) => Boolean(user)),
    );
  }
}