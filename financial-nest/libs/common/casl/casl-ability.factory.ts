import {
  PureAbility,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { RoleEntity } from '@financial/auth/entity/role.entity';
// import { UserEntity } from '@financial/auth/entity/user.entity';
// import { LoginUserPayload } from '@financial/auth/service/auth.service';
import { Action, permissions } from '../constants';

type Subjects = InferSubjects<any> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);
    // if (!user.roleName) {
    // throw new HttpException('没有角色', HttpStatus.FORBIDDEN);
    // }
    // 临时放开全部权限
    can(Action.Manage, 'all');
    // permissions[user.roleName]({ can, cannot });
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
