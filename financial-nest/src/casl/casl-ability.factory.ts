import {
  PureAbility,
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/auth/entity/role.entity';
import { UserEntity } from 'src/auth/entity/user.entity';
import { LoginUserPayload } from 'src/auth/service/auth.service';
import { Action, permissions } from 'src/common/constants';

type Subjects = InferSubjects<typeof RoleEntity | typeof UserEntity> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: LoginUserPayload) {
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
