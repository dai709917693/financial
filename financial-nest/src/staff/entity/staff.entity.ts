import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StaffProjectEntity } from './staff_project.entity';

@Entity()
export class StaffEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => StaffProjectEntity,
    (staffProjectEntity) => staffProjectEntity.staff,
  )
  staffProjects: StaffProjectEntity[];
}
