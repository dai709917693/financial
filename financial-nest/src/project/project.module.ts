import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';
import { StaffProjectService } from 'src/staff/service/staffProject.service';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';
import { StaffEntity } from 'src/staff/entity/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, StaffProjectEntity, StaffEntity]),
  ],
  providers: [ProjectService, StaffProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
