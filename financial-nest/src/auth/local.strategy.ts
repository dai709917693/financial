import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    @Request() req,
    username: string,
    password: string,
  ): Promise<any> {
    const roleName = req.body.role;
    const foundUser = await this.authService.validateUser(
      username,
      password,
      roleName,
    );
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
