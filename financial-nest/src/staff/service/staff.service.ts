import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity';
import {
  CreateStaffDto,
  StaffProjectConfig,
  QueryStaffDto,
  UpdateStaffDto,
} from '../dto/staff.dto';
import { StaffProjectEntity } from '../entity/staff_project.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { StaffProjectService } from './staffProject.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private repo: Repository<StaffEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,

    private staffProjectService: StaffProjectService,
  ) {}

  async create(dto: CreateStaffDto) {
    const newData = await this.repo.save(dto);
    await this.staffProjectService.create(
      dto.projects.map((item) => ({ ...item, staffId: newData.id })),
    );
    return;
  }

  async update(dto: UpdateStaffDto) {
    const data = await this.repo.findOne({
      relations: ['staffProjects'],
      where: { id: dto.id },
    });
    if (!data) {
      throw new HttpException('数据不存在', HttpStatus.BAD_REQUEST);
    }
    await this.repo.update(data.id, {
      name: dto.name,
    });
    await this.staffProjectService.create(
      dto.projects.map((item) => ({ ...item, staffId: data.id })),
    );
    const needRemove = data.staffProjects.filter(
      (staffProject) =>
        !dto.projects.some((item) => item.projectId === staffProject.projectId),
    );
    needRemove.length !== 0 && (await this.staffProjectRepo.remove(needRemove));
    return;
  }

  async remove(staffId: string) {
    await this.staffProjectRepo.delete({ staffId });
    await this.repo.delete({ id: staffId });
    return;
  }

  async findAll(query: QueryStaffDto) {
    const [list, total] = await this.repo.findAndCount({
      relations: ['staffProjects'],
      where: {
        name: Like(`%${query.name}%`),
      },
      skip: (query.pageNum - 1) * query.pageSize,
      take: query.pageSize,
    });
    return { list, total };
  }
}
