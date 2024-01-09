import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto';
import { LocalAuthGuard } from '../local.guard';
import { Public } from 'src/common/decorator';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.signup(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}
