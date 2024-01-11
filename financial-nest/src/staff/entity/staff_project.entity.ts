import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { StaffEntity } from './staff.entity';
import { CheckEntity } from 'src/check/entity/check.entity';

@Entity()
@Index(['staffId', 'projectId'], { unique: true })
export class StaffProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  staffId?: string;

  @Column()
  projectId?: string;

  // 出勤单价
  @Column()
  attendanceUnitPrice: number;

  // 加班单价
  @Column()
  overtimeUnitPrice: number;

  @ManyToOne(() => StaffEntity, (staff) => staff.staffProjects)
  @JoinColumn({ name: 'staffId' })
  staff: StaffEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.staffProjects)
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity;

  @OneToMany(() => CheckEntity, (check) => check.staffProject)
  checks: CheckEntity[];
}
