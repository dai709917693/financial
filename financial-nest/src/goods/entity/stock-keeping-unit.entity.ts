import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StandardProductUnitEntity } from './standard-product-unit.entity';
import { Exclude } from 'class-transformer';

/** 库存量单位 */
@Entity()
export class StockKeepingUnitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json' })
  images: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'json' })
  param: string;

  /** 是否上架 */
  @Column({ type: 'boolean', default: false })
  saleable: boolean;

  /** 是否有效 */
  @Column({ type: 'boolean', default: true })
  valid: boolean;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  lastUpdateTime: string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => StandardProductUnitEntity, (cate) => cate.skuList)
  @JoinColumn()
  spu: StandardProductUnitEntity;
}
