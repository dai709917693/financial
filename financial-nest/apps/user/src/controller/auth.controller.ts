import { Controller } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserEntity } from '../entity/user.entity';
import {
  LoginParams,
  SignupParams,
  UserAuthServiceControllerMethods,
} from '@lib/common/proto';

@Controller()
@UserAuthServiceControllerMethods()
export class AuthController {
  constructor(private usersService: AuthService) {}

  async signup(user: SignupParams) {
    return this.usersService.signup(user);
  }

  async login(req: LoginParams) {
    const user = await this.usersService.validateUser(
      req.username,
      req.password,
      req.roleName,
    );

    const token = await this.usersService.login(user);
    return { data: token };
  }

  async verify({ data }: any) {
    return this.usersService.verify(data);
  }
}
