import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  notes: string;

  @OneToMany(
    () => StaffProjectEntity,
    (staffProjectEntity) => staffProjectEntity.project,
  )
  staffProjects: StaffProjectEntity[];
}
