import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecParamDto, CreateSpecGroupDto } from '../dto';
import { SpecGroupEntity } from '../entity/spec-group.entity';
import { SpecParamEntity } from '../entity/spec-param.entity';

@Injectable()
export class SpecService {
  constructor(
    @InjectRepository(SpecGroupEntity)
    private spgRepo: Repository<SpecGroupEntity>,

    @InjectRepository(SpecParamEntity)
    private sppRepo: Repository<SpecParamEntity>,
  ) {}

  async createSpg(dto: CreateSpecGroupDto) {
    const newData = await this.spgRepo.create(dto);
    return await this.spgRepo.save(newData);
  }

  async createSpp(dto: CreateSpecParamDto) {
    const spg = await this.spgRepo.findOneBy({ id: dto.spgId });
    const newData = this.sppRepo.create(dto);
    newData.specGroup = spg;
    return this.sppRepo.save(newData);
  }
}
