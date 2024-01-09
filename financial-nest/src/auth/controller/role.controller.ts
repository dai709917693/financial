import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateRoleDto, InviteAdminDto } from '../dto';
import { RoleService } from '../service/role.service';
import { CheckPolicies, Public } from 'src/common/decorator';
import { Action, Role } from 'src/common/constants';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { RoleEntity } from '../entity/role.entity';
import { LocalAuthGuard } from '../local.guard';
import { UserEntity } from '../entity/user.entity';

@Controller({
  path: 'role',
  version: '1',
})
export class RoleController {
  constructor(private roleService: RoleService) {}

  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, RoleEntity),
  )
  @Post()
  create(@Body() createDto: CreateRoleDto) {
    return this.roleService.create(createDto);
  }

  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, UserEntity),
  )
  @Post('inviteAdmin')
  async inviteAdmin(@Body() user: InviteAdminDto) {
    return this.roleService.changeRoles(user.username, [Role.ADMIN]);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('getRoles')
  async getRoles(@Request() req) {
    return req.user.roles;
  }
}
