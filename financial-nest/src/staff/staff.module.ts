import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entity/staff.entity';
import { StaffService } from './service/staff.service';
import { StaffController } from './controller/staff.controller';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { StaffProjectEntity } from './entity/staff_project.entity';
import { StaffProjectService } from './service/staffProject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffEntity, ProjectEntity, StaffProjectEntity]),
  ],
  providers: [StaffService, StaffProjectService],
  controllers: [StaffController],
})
export class StaffModule {}
