import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '@financial/project/entity/project.entity';
import { StaffEntity } from '@financial/staff/entity/staff.entity';
import { StaffProjectEntity } from '@financial/staff/entity/staff_project.entity';
import { SalaryService } from './service/salary.service';
import { SalaryController } from './controller/salary.controller';
import { CheckEntity } from '@financial/check/entity/check.entity';

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
