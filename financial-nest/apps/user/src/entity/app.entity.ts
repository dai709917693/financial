import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 32, unique: true })
  name: string;

  @Column({ length: 64, nullable: true })
  desc: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => RoleEntity, (role) => role.app)
  roles: RoleEntity[];
}
