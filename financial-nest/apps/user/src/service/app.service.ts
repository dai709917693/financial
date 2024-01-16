import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { AppEntity } from '@user/entity/app.entity';
import { RPCCode } from '@lib/common/constants';
import { App, CreateAppParams, QueryAppParams } from '@lib/common/proto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private repo: Repository<AppEntity>,
  ) {}

  async create(dto: CreateAppParams) {
    const { name } = dto;
    if (!name) {
      throw new RpcException({
        code: RPCCode.INVALID_ARGUMENT,
        message: '名称为空',
      });
    }
    const exist = await this.repo.findOne({
      where: { name },
    });
    if (exist) {
      throw new RpcException({
        code: RPCCode.INVALID_ARGUMENT,
        message: '应用名已存在',
      });
    }

    const newData = await this.repo.create(dto);
    return await this.repo.save(newData);
  }

  async update(dto: App) {
    if (!dto.id) {
      throw new RpcException('数据不存在');
    }
    if (!dto.name) {
      throw new RpcException({
        code: RPCCode.INVALID_ARGUMENT,
        message: '名称为空',
      });
    }
    const data = await this.repo.findOne({
      where: { id: dto.id },
    });
    if (!data) {
      throw new RpcException('数据不存在');
    }
    await this.repo.update(data.id, {
      name: dto.name,
      desc: dto.desc,
    });
    return;
  }

  findAll(query: QueryAppParams) {
    return this.repo.findBy(query);
  }
}
