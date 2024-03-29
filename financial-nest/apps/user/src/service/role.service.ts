import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { RoleEntity } from '../entity/role.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async changeRoles(username: string, roleNames: string[]) {
    const roles = await this.roleRepository.findBy(
      roleNames.map((name) => ({ name })),
    );
    const user = await this.userRepository.findOneBy({ username });
    user.roles = roles;
    return this.userRepository.save(user);
  }

  async create(dto) {
    const { name } = dto;
    const exist = await this.roleRepository.findOne({
      where: { name },
    });
    if (exist) {
      throw new RpcException('角色名已存在');
    }

    const newData = await this.roleRepository.create(dto);
    return await this.roleRepository.save(newData);
  }
}
