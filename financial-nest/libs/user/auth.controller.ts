import { Body, Controller, Inject, Post } from '@nestjs/common';
import { USER_AUTH_SERVICE_NAME, UserAuthServiceClient } from '../common/proto';
import { Public } from '@lib/common/decorator';
import { CreateUserDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(USER_AUTH_SERVICE_NAME)
    private readonly service: UserAuthServiceClient,
  ) {}

  @Public()
  @Post('login')
  login(@Body() req: LoginDto) {
    return this.service.login(req);
  }

  @Public()
  @Post('signup')
  signup(@Body() req: CreateUserDto) {
    return this.service.signup(req);
  }
}
