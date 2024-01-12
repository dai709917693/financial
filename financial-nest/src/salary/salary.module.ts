import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { StaffEntity } from 'src/staff/entity/staff.entity';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';
import { SalaryService } from './service/salary.service';
import { SalaryController } from './controller/salary.controller';
import { CheckEntity } from 'src/check/entity/check.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
      ProjectEntity,
      StaffProjectEntity,
      CheckEntity,
    ]),
  ],
  providers: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule {}
