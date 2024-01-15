import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParams, SignupParams } from '../proto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() req: LoginParams) {
    return this.service.login(req);
  }

  @Post('signup')
  signup(@Body() req: SignupParams) {
    return this.service.signup(req);
  }
}
