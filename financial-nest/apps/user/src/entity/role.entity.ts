import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AppEntity } from './app.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 32, unique: true })
  name: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ length: 64, nullable: true })
  desc: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => AppEntity, (app) => app.roles)
  app: AppEntity;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
