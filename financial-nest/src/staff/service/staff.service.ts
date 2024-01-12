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
import { CheckEntity } from 'src/check/entity/check.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private repo: Repository<StaffEntity>,

    @InjectRepository(CheckEntity)
    private checkRepo: Repository<CheckEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,

    private staffProjectService: StaffProjectService,
  ) {}

  async create(dto: CreateStaffDto) {
    const newData = await this.repo.save({
      name: dto.name,
      job: dto.job,
    });
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
    if (needRemove.length !== 0) {
      await Promise.all(
        needRemove.map((item) =>
          this.checkRepo.delete({ staffProjectId: item.id }),
        ),
      );
      await this.staffProjectRepo.remove(needRemove);
    }
    return;
  }

  async remove(staffId: string) {
    const res = await this.staffProjectRepo.findBy({
      staffId,
    });
    if (res.length !== 0) {
      throw new HttpException('该员工还有未退出的项目', HttpStatus.FORBIDDEN);
    }
    await this.repo.delete({ id: staffId });
    return;
  }

  async getList(query: QueryStaffDto) {
    let where: any = {
      name: Like(`%${query.name}%`),
    };
    if (query.projectId) {
      const staffProjects = await this.staffProjectRepo.find({
        relations: ['project'],
        where: {
          projectId: query.projectId,
        },
      });
      where = staffProjects.map((item) => ({
        id: item.staffId,
        name: Like(`%${query.name}%`),
      }));
    }

    const [list, total] = await this.repo.findAndCount({
      relations: ['staffProjects', 'staffProjects.project'],
      where,
      skip: (query.pageNum - 1) * query.pageSize,
      take: query.pageSize,
    });
    return { list, total };
  }

  async findAll() {
    return this.repo.find();
  }
}
