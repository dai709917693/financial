import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sortBy } from 'lodash';
import { StaffProjectEntity } from '@financial/staff/entity/staff_project.entity';
import { StaffEntity } from '@financial/staff/entity/staff.entity';
import { CheckEntity } from '@financial/check/entity/check.entity';
import { QuerySalaryDto } from '../dto/salary.dto';
import { ProjectEntity } from '@financial/project/entity/project.entity';

interface SalaryDataDetail {
  attendance?: number;
  overtime?: number;
  attendanceSalary?: number;
  overtimeSalary?: number;
  totalSalary?: number;
  paidSalary?: number;
  reserveSalary?: number;
}

export interface SalaryData {
  time: string;
  data: Record<string, SalaryDataDetail>;
}

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(CheckEntity)
    private checkRepo: Repository<CheckEntity>,

    @InjectRepository(StaffProjectEntity)
    private staffProjectRepo: Repository<StaffProjectEntity>,
  ) {}

  async getData({ projectId, staffId, time }: QuerySalaryDto) {
    if (!projectId && !staffId) {
      throw new HttpException('至少传一个参数', HttpStatus.BAD_REQUEST);
    }
    let relations = [];
    if (projectId) {
      relations = ['staff'];
    } else {
      relations = ['project'];
    }
    const staffProjects = await this.staffProjectRepo.find({
      relations,
      where: {
        projectId: projectId ? projectId : undefined,
        staffId: staffId ? staffId : undefined,
      },
    });
    if (staffProjects.length === 0) {
      return {
        rows: [],
        salaryData: [],
      };
    }
    const checkParams = [];
    const entityObj: Record<string, StaffEntity | ProjectEntity> = {};
    const rows = [];
    const staffProjectObj: Record<string, StaffProjectEntity> = {};
    staffProjects.forEach((staffProject) => {
      staffProjectObj[staffProject.id] = staffProject;
      checkParams.push({
        staffProjectId: staffProject.id,
        time: time || undefined,
      });
      const rowItem = projectId ? staffProject.staff : staffProject.project;
      rows.push({
        ...rowItem,
        attendanceUnitPrice: staffProject.attendanceUnitPrice,
        overtimeUnitPrice: staffProject.overtimeUnitPrice,
      });
      entityObj[staffProject.id] = rowItem;
    });

    const checks = await this.checkRepo.findBy(checkParams);
    const dataIndex: Record<string, number> = {};
    let salaryData: SalaryData[] = [];
    checks.forEach((check) => {
      if (dataIndex[check.time] === undefined) {
        dataIndex[check.time] = salaryData.length;
        salaryData.push({
          time: check.time,
          data: {},
        });
      }
      const entityId = entityObj[check.staffProjectId].id;
      const staffProject = staffProjectObj[check.staffProjectId];
      salaryData[dataIndex[check.time]].data[entityId] = {
        overtime: check.overtime,
        attendance: check.attendance,
        attendanceSalary: check.attendance
          ? check.attendance * staffProject.attendanceUnitPrice
          : undefined,
        overtimeSalary: check.overtime
          ? check.overtime * staffProject.overtimeUnitPrice
          : undefined,
        // totalSalary?: number;
        // paidSalary?: number;
        // reserveSalary?: number;
      };
    });
    salaryData = sortBy(salaryData, (item) => {
      return item.time.replace('-', '');
    });

    return {
      rows,
      salaryData,
    };
  }
}
