import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from '../decorator';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());

//     if (!roles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();

//     const user: LoginUserPayload = request.user;
//     const hasRole = () => user.roleNames.some((role) => roles.includes(role));
//     const res = user && user.roleNames && hasRole();
//     console.log(user.roleNames);
//     if (!res) {
//       throw new HttpException('权限不足', HttpStatus.FORBIDDEN);
//     }
//     return res;
//   }
// }

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return true;
    }
    const ability = this.caslAbilityFactory.createForUser(user);

    const res = policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
    if (!res) {
      throw new HttpException('权限不足', HttpStatus.FORBIDDEN);
    }
    return res;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
