import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BrandEntity } from './brand.entity';
import { SpecGroupEntity } from './spec-group.entity';
import { StockKeepingUnitEntity } from './stock-keeping-unit.entity';
import { Exclude } from 'class-transformer';

/** 标准产品单元 */
@Entity()
export class StandardProductUnitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;

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

  @ManyToOne(() => CategoryEntity, (item) => item.spu)
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (item) => item.spu)
  @JoinColumn()
  brand: BrandEntity;

  @ManyToOne(() => SpecGroupEntity, (item) => item.spu)
  @JoinColumn()
  spg: SpecGroupEntity;

  @OneToMany(() => StockKeepingUnitEntity, (cate) => cate.spu)
  skuList: StockKeepingUnitEntity[];
}
