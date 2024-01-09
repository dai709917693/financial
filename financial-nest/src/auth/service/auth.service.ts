import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/constants';

export interface LoginUserPayload {
  username: string;
  sub: string;
  roleName: Role;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwt: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<UserEntity> {
    const { username } = user;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create({
      ...user,
    });
    return await this.userRepository.save(newUser);
  }

  async validateUser(
    username: string,
    password: string,
    roleName?: string,
  ): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      relations: ['roles'],
      where: {
        username: username,
        roles: {
          name: roleName,
        },
      },
    });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
  }
  async login(user: UserEntity) {
    const payload: LoginUserPayload = {
      username: user.username,
      sub: user.id,
      roleName: user.roles[0].name as Role,
    };

    return this.jwt.sign(payload);
  }
}
