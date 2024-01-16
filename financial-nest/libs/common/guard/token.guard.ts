import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@lib/common/constants';
import { map, catchError, throwError, Observable } from 'rxjs';
import {
  USER_AUTH_SERVICE_NAME,
  UserAppServiceClient,
  UserAuthServiceClient,
} from '../proto';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(USER_AUTH_SERVICE_NAME) private authService: UserAuthServiceClient,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    } else {
      return this.authService
        .verify({
          data: token,
        })
        .pipe(
          map((data) => {
            req.user = data;
            return true;
          }),
        );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
