import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RoleEntity } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Action.Create, RoleEntity),
  // )
  // @Post()
  @GrpcMethod('RoleService')
  create(createDto) {
    return this.roleService.create(createDto);
  }

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Action.Update, UserEntity),
  // )
  // @Post('inviteAdmin')
  // @GrpcMethod('RoleService')
  // async inviteAdmin(user: InviteAdminDto) {
  //   return this.roleService.changeRoles(user.username, [Role.ADMIN]);
  // }

  // @Public()
  // @Post('getRoles')
  // @GrpcMethod('RoleService')
  // async getRoles(req) {
  //   return req.user.roles;
  // }
}
