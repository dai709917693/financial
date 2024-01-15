import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@user/constants';
import { RpcException } from '@nestjs/microservices';

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
      throw new RpcException('用户名已存在');
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

      throw new RpcException('密码错误');
    }
    throw new RpcException('用户不存在');
  }
  async login(user: UserEntity) {
    const payload: LoginUserPayload = {
      username: user.username,
      sub: user.id,
      roleName: user.roles[0]?.name as Role,
    };
    return this.jwt.sign(payload);
  }

  async verify(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (e) {
      throw new RpcException('token错误');
    }
  }
}
