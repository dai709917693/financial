import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { StaffProjectService } from 'src/staff/service/staffProject.service';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private repo: Repository<ProjectEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,

    private staffProjectService: StaffProjectService,
  ) {}

  async create(dto: CreateProjectDto) {
    const { name } = dto;
    const exist = await this.repo.findOne({
      where: { name },
    });
    if (exist) {
      throw new HttpException('项目名称已存在', HttpStatus.BAD_REQUEST);
    }

    const newData = this.repo.create(dto);
    await this.staffProjectService.create(
      dto.staffs.map((item) => ({ ...item, projectId: newData.id })),
    );
    return await this.repo.save(newData);
  }

  async update(dto: UpdateProjectDto) {
    const data = await this.repo.findOne({
      relations: ['staffProjects'],
      where: { id: dto.id },
    });
    if (!data) {
      throw new HttpException('数据不存在', HttpStatus.BAD_REQUEST);
    }
    await this.repo.update(data.id, {
      name: dto.name,
      notes: dto.notes,
    });
    await this.staffProjectService.create(
      dto.staffs.map((item) => ({ ...item, projectId: data.id })),
    );
    const needRemove = data.staffProjects.filter(
      (staffProject) =>
        !dto.staffs.some((item) => item.projectId === staffProject.projectId),
    );
    needRemove.length !== 0 && (await this.staffProjectRepo.remove(needRemove));
    return;
  }

  findAll() {
    return this.repo.find();
  }
}
