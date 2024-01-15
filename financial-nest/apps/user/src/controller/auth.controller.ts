import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto, LoginDto } from '../dto';
import { LocalAuthGuard } from '../guard/local.guard';
import { Public } from '@financial/common/decorator';
import { GrpcMethod } from '@nestjs/microservices';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private usersService: AuthService) {}

  @GrpcMethod('AuthService')
  async signup(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.signup(user);
  }

  @GrpcMethod('AuthService')
  async login(req: LoginDto) {
    const user = await this.usersService.validateUser(
      req.username,
      req.password,
      req.roleName,
    );

    const token = await this.usersService.login(user);
    return { data: token };
  }

  @GrpcMethod('AuthService')
  async verify({ data }: any) {
    return this.usersService.verify(data);
  }
}
