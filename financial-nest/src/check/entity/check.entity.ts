import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { StaffProjectEntity } from 'src/staff/entity/staff_project.entity';

@Entity()
@Index(['time', 'staffProjectId'], { unique: true })
export class CheckEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  staffProjectId?: string;

  @Column()
  time: string;

  @Column()
  attendance: number;

  @Column()
  overtime: number;

  @ManyToOne(
    () => StaffProjectEntity,
    (staffProjectEntity) => staffProjectEntity.checks,
  )
  @JoinColumn({ name: 'staffProjectId' })
  staffProject: StaffProjectEntity;
}