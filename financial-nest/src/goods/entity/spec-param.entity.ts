import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SpecGroupEntity } from './spec-group.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class SpecParamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  /** 是否为数字参数 */
  @Column({ type: 'boolean', default: false })
  numeric: boolean;

  @Column()
  unit: string;

  @Column()
  segments: string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => SpecGroupEntity, (item) => item.id)
  @JoinColumn()
  specGroup: SpecGroupEntity;
}
