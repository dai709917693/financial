import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';
import { CheckEntity } from '../entity/check.entity';
import { UpdateCheckDto } from '../dto/check.dto';

@Injectable()
export class CheckService {
  constructor(
    @InjectRepository(CheckEntity)
    private repo: Repository<CheckEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,
  ) {}

  async update(dto: UpdateCheckDto) {
    let pros = [];
    dto.data.forEach(({ time, data }) => {
      pros = pros.concat(
        Object.entries(data).map(([staffId, val]) =>
          this.staffProjectRepo
            .findOneBy({
              staffId,
              projectId: dto.projectId,
            })
            .then((staffProject) => {
              return this.repo.save({
                staffProject,
                time,
                attendance: val.attendance,
                overtime: val.overtime,
              });
            }),
        ),
      );
    });
    await Promise.all(pros);
    return;
  }

  async getData(projectId: string) {
    //
  }

  async findAll() {
    return this.repo.find();
  }
}
