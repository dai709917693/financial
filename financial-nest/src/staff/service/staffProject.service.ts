import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity';
import { StaffProjectConfig } from '../dto/staff.dto';
import { StaffProjectEntity } from '../entity/staff_project.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';

@Injectable()
export class StaffProjectService {
  constructor(
    @InjectRepository(StaffEntity)
    private staffRepo: Repository<StaffEntity>,

    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,
  ) {}

  async create(data: StaffProjectConfig[]) {
    const doneData = [];
    await Promise.all(
      data.map((item) =>
        Promise.all([
          this.projectRepo.findOneBy({ id: item.projectId }),
          this.staffRepo.findOneBy({ id: item.staffId }),
        ]).then(([res1, res2]) => {
          res1 &&
            res2 &&
            doneData.push({
              id: item.id,
              project: res1,
              attendanceUnitPrice: item.attendanceUnitPrice,
              overtimeUnitPrice: item.overtimeUnitPrice,
              staff: res2,
            });
        }),
      ),
    );
    doneData.length !== 0 && (await this.staffProjectRepo.save(doneData));
  }
}
