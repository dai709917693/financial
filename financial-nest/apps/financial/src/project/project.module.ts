import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';
import { StaffProjectService } from '@financial/staff/service/staffProject.service';
import { StaffProjectEntity } from '@financial/staff/entity/staff_project.entity';
import { StaffEntity } from '@financial/staff/entity/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, StaffProjectEntity, StaffEntity]),
  ],
  providers: [ProjectService, StaffProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
