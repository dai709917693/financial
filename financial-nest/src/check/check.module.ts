import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckEntity } from './entity/check.entity';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';
import { CheckService } from './service/check.service';
import { CheckController } from './controller/check.controller';
import { StaffEntity } from 'src/staff/entity/staff.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckEntity,
      StaffProjectEntity,
      StaffEntity,
      ProjectEntity,
    ]),
  ],
  providers: [CheckService],
  controllers: [CheckController],
})
export class CheckModule {}
