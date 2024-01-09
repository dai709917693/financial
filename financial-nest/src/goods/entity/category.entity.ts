import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { StandardProductUnitEntity } from './standard-product-unit.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ type: 'boolean', default: false })
  ifParent: boolean;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToMany(() => BrandEntity, (brand) => brand.categories)
  @JoinTable()
  brands: BrandEntity[];

  @OneToMany(() => StandardProductUnitEntity, (item) => item.category)
  spu: StandardProductUnitEntity[];
}
