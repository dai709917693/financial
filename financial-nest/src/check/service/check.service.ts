import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sortBy } from 'lodash';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';
import { CheckEntity } from '../entity/check.entity';
import { UpdateCheckDto } from '../dto/check.dto';
import { StaffEntity } from 'src/staff/entity/staff.entity';

@Injectable()
export class CheckService {
  constructor(
    @InjectRepository(CheckEntity)
    private repo: Repository<CheckEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,
  ) {}

  verifyTimeFormat(time: string) {
    return /^\d{4}-\d{2}$/.test(time);
  }

  async update(dto: UpdateCheckDto) {
    let pros = [];
    dto.checkData.forEach(({ time, data }) => {
      if (!this.verifyTimeFormat(time)) {
        return;
      }
      pros = pros.concat(
        Object.entries(data).map(([staffId, val]) => {
          const { attendance, overtime } = val;
          return this.staffProjectRepo
            .findOneBy({
              staffId,
              projectId: dto.projectId,
            })
            .then(async (staffProject) => {
              const check = await this.repo.findOneBy({
                staffProject,
                time,
              });
              return this.repo.save({
                id: check?.id,
                staffProject,
                time,
                attendance:
                  attendance === null || attendance === ''
                    ? null
                    : Number(attendance),
                overtime:
                  overtime === null || overtime === ''
                    ? null
                    : Number(overtime),
              });
            });
        }),
      );
    });
    await Promise.all(pros);
    return;
  }

  async getData(projectId: string) {
    const staffProjects = await this.staffProjectRepo.find({
      relations: ['staff'],
      where: {
        projectId: projectId,
      },
    });
    if (staffProjects.length === 0) {
      return {
        staffs: [],
        checkData: [],
      };
    }
    const ids = [];
    const staffObj: Record<string, StaffEntity> = {};
    const staffList: StaffEntity[] = [];
    staffProjects.forEach((staffProject) => {
      ids.push({ staffProjectId: staffProject.id });
      staffList.push(staffProject.staff);
      staffObj[staffProject.id] = staffProject.staff;
    });
    const checks = await this.repo.findBy(ids);
    const dataIndex: Record<string, number> = {};
    let checkData: {
      time: string;
      data: Record<string, { attendance?: number; overtime?: number }>;
    }[] = [];
    checks.forEach((check) => {
      if (dataIndex[check.time] === undefined) {
        dataIndex[check.time] = checkData.length;
        const defData = {};
        staffList.forEach((staff) => {
          defData[staff.id] = {
            overtime: null,
            attendance: null,
          };
        });
        checkData.push({
          time: check.time,
          data: defData,
        });
      }
      const staffId = staffObj[check.staffProjectId].id;
      checkData[dataIndex[check.time]].data[staffId] = {
        overtime: check.overtime,
        attendance: check.attendance,
      };
    });
    checkData = sortBy(checkData, (item) => {
      return item.time.replace('-', '');
    });

    return {
      staffs: staffList,
      checkData,
    };
  }

  async findAll() {
    return this.repo.find();
  }
}
